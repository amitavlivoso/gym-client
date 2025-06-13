import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  CircularProgress,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DashboardLayout from "../../components/shared/DashBoardLayout";
import AttendanceCard from "../../components/Member/DashBoard/AttendnanceCard";
import TimeSpentCard from "../../components/Member/DashBoard/TimeSpendCard";
import MembershipCard from "../../components/Member/DashBoard/MemberShipCard";
import StreakCard from "../../components/Member/DashBoard/StreakCard";
import WeeklyActivityChart from "../../components/Member/DashBoard/WeeklyActivityChart";
import WorkoutTrendChart from "../../components/Member/DashBoard/WorkoutTrendChart";
import RecentSessions from "../../components/Member/DashBoard/RecentSessions";
import QuickActions from "../../components/Member/DashBoard/QuickActions";
import {
  addCheckIn,
  getAllCheckIn,
  updateCheckOut,
} from "../../services/Service";
import { getUserId } from "../../services/axiosClient";

export default function UserDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [recentSessions, setRecentSessions] = useState([]);
  const [ongoingSessionId, setOngoingSessionId] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchDashboardData = () => {
    const userId = getUserId();
    const payload = {
      data: { filter: "", userId },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "DESC"]],
    };

    console.log("Fetching dashboard data...");
    getAllCheckIn(payload)
      .then((res) => {
        const allSessions = res?.data?.data?.rows || [];
        const ongoingSession = allSessions.find(
          (s) => !s.checkOutTime && s.userId === userId
        );

        console.log("Ongoing session found:", ongoingSession);
        setIsCheckedIn(!!ongoingSession);
        setOngoingSessionId(ongoingSession?.id || null);

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const filteredSessions = allSessions.filter((session) => {
          const sessionDate = new Date(session.createdAt);
          return sessionDate >= sevenDaysAgo;
        });

        setRecentSessions(filteredSessions);
        updateDashboardStats(filteredSessions);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setIsCheckedIn(false);
        setOngoingSessionId(null);
        setLoading(false);
      });
  };

  const updateDashboardStats = (sessions) => {
    // Step 1: Compute duration for each session from checkInTime & checkOutTime
    const sessionsWithDuration = sessions.map((s) => {
      let duration = 0;
      if (s.checkInTime && s.checkOutTime) {
        const checkIn = new Date(s.checkInTime);
        const checkOut = new Date(s.checkOutTime);
        const rawDuration = (checkOut - checkIn) / (1000 * 60); // in minutes
        duration = Math.max(1, Math.round(rawDuration));
      }
      return { ...s, duration };
    });

    console.log("Sessions with calculated durations:", sessionsWithDuration);

    // Step 2: Calculate weekly data and summary stats
    const weeklyData = calculateWeeklyData(sessionsWithDuration);
    const { totalCheckIns, totalDuration } = calculateWeeklyStats(weeklyData);

    console.log("Weekly Stats:", { totalCheckIns, totalDuration });

    // Step 3: Update the dashboard
    setDashboardData({
      sessionCount: sessionsWithDuration.length,
      totalMinutes: totalDuration,
      membershipEndsAt: "2025-07-15", // ideally from API
      monthlySessions: sessionsWithDuration.filter(
        (s) => new Date(s.createdAt) >= new Date(new Date().setDate(1))
      ).length,
      weeklyData,
      recentSessions: sessionsWithDuration,
      favoriteTime: calculateFavoriteTime(sessionsWithDuration),
      streak: calculateCurrentStreak(sessionsWithDuration),
      caloriesBurned: calculateCaloriesBurned(totalDuration),
    });
  };

  const calculateWeeklyData = (sessions) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days.map((day) => {
      const daySessions = sessions.filter(
        (s) =>
          new Date(s.createdAt).toLocaleDateString("en-US", {
            weekday: "short",
          }) === day
      );
      return {
        day,
        checkIns: daySessions.length,
        duration: daySessions.reduce((sum, s) => sum + (s.duration || 0), 0),
      };
    });
  };

  const calculateFavoriteTime = (sessions) => {
    // Implement your logic to determine favorite workout time
    return "Evening (6-9 PM)";
  };

  const calculateCurrentStreak = (sessions) => {
    // Implement streak calculation logic
    return 3;
  };

  const calculateCaloriesBurned = (totalMinutes) => {
    // Simple estimation: 10 calories per minute
    return totalMinutes * 10;
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleCheckIn = () => {
    setCheckingIn(true);
    const now = new Date();
    const newSession = {
      userId: getUserId(),
      date: now.toISOString().split("T")[0],
      checkInTime: now.toISOString(), // Changed from checkIn to checkInTime
      checkOutTime: null,
      duration: 0,
    };

    // Optimistic UI update
    const tempSessionId = `temp-${Date.now()}`;
    setRecentSessions((prev) => [
      {
        ...newSession,
        id: tempSessionId,
        createdAt: now.toISOString(),
      },
      ...prev,
    ]);
    setIsCheckedIn(true);
    setOngoingSessionId(tempSessionId);

    addCheckIn(newSession)
      .then((res) => {
        const createdSession = res.data;
        // Replace temporary session with real one from backend
        setRecentSessions((prev) => [
          createdSession,
          ...prev.filter((s) => s.id !== tempSessionId),
        ]);
        setOngoingSessionId(createdSession.id);
        setAlert({
          open: true,
          message: "Checked in successfully! Your workout has started.",
          severity: "success",
        });
        // Update dashboard stats with the new session
        updateDashboardStats([createdSession, ...recentSessions]);
      })
      .catch((err) => {
        console.error("Check-in error:", err);
        // Rollback optimistic update
        setRecentSessions((prev) => prev.filter((s) => s.id !== tempSessionId));
        setIsCheckedIn(false);
        setAlert({
          open: true,
          message: "Failed to check in. Please try again.",
          severity: "error",
        });
      })
      .finally(() => setCheckingIn(false));
  };

  const handleCheckOut = () => {
    // if (!ongoingSessionId) return;

    console.log("Starting checkout process");
    setCheckingIn(true);

    const now = new Date();
    const checkoutTime = now.toISOString();

    const ongoingSession = recentSessions.find(
      (s) => s.id === ongoingSessionId
    );
    if (!ongoingSession) return;

    console.log(ongoingSession);

    const checkInTime = new Date(ongoingSession.checkInTime);
    const duration = Math.round((now - checkInTime) / (1000 * 60));

    // Optimistic UI update - no need to refresh data
    const updatedSession = {
      ...ongoingSession,
      checkOutTime: checkoutTime, // Changed from checkOut to checkOutTime
      duration,
    };

    setRecentSessions((prev) => [
      updatedSession,
      ...prev.filter((s) => s.id !== ongoingSessionId),
    ]);
    setIsCheckedIn(false);
    setOngoingSessionId(null);
    console.log("on going session id is :", ongoingSessionId);

    updateCheckOut({ checkOutTime: checkoutTime }, ongoingSessionId)
      .then(() => {
        console.log("Checkout successful - no refresh needed");
        setAlert({
          open: true,
          message: "Checked out successfully!",
          severity: "success",
        });
        // Update dashboard stats with the updated session
        updateDashboardStats([
          updatedSession,
          ...recentSessions.filter((s) => s.id !== ongoingSessionId),
        ]);
      })
      .catch((err) => {
        console.error("Check-out error:", err);
        // Rollback
        setIsCheckedIn(true);
        setOngoingSessionId(ongoingSessionId);
        setRecentSessions((prev) => [
          ongoingSession,
          ...prev.filter((s) => s.id !== ongoingSessionId),
        ]);
        setAlert({
          open: true,
          message: "Failed to check out. Please try again.",
          severity: "error",
        });
      })
      .finally(() => {
        console.log("Checkout process complete");
        setCheckingIn(false);
      });
  };
  const formatMinutes = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  const calculateWeeklyStats = () => {
    if (!dashboardData) return { totalCheckIns: 0, totalDuration: 0 };
    return dashboardData.weeklyData.reduce(
      (acc, day) => ({
        totalCheckIns: acc.totalCheckIns + day.checkIns,
        totalDuration: acc.totalDuration + day.duration,
      }),
      { totalCheckIns: 0, totalDuration: 0 }
    );
  };

  return (
    <DashboardLayout title="Dashboard Overview">
      <Typography
        variant="h5"
        gutterBottom
        fontWeight="bold"
        sx={{ mb: 3, color: "#000", display: "flex", justifyContent: "center" }}
      >
        Welcome Back, Fitness Champion! 💪
      </Typography>

      {loading ? (
        <Box mt={4} display="flex" justifyContent="center">
          <CircularProgress size={60} thickness={4} />
        </Box>
      ) : (
        <>
          {/* Recent Sessions and Quick Actions */}
          <Box
            container
            spacing={3}
            mt={1}
            sx={{ display: "flex", justifyContent: "space-between" }}
            mb={8}
          >
            {/* Left Column - Recent Sessions (50% width) */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                minWidth: { xs: "100%", md: "49%" },
              }}
            >
              <RecentSessions
                recentSessions={recentSessions}
                formatMinutes={formatMinutes}
              />
            </Grid>

            {/* Right Column - Quick Actions (50% width) */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                minWidth: { xs: "100%", md: "50%" },
              }}
            >
              <QuickActions
                handleCheckIn={handleCheckIn}
                checkingIn={checkingIn}
                handleCheckOut={handleCheckOut}
                isCheckedIn={isCheckedIn}
                caloriesBurned={dashboardData.caloriesBurned}
                totalMinutes={dashboardData.totalMinutes}
                sessionCount={dashboardData.sessionCount}
              />
            </Grid>
          </Box>

          {/* Summary Cards */}
          <Box
            container
            spacing={3}
            sx={{
              mb: "80px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              lg={3}
              xl={3}
              sx={{ minWidth: 280 }}
            >
              <AttendanceCard
                sessionCount={dashboardData.sessionCount}
                monthlySessions={dashboardData.monthlySessions}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <TimeSpentCard
                totalMinutes={dashboardData.totalMinutes}
                formatMinutes={formatMinutes}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <MembershipCard
                membershipEndsAt={dashboardData.membershipEndsAt}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <StreakCard streak={dashboardData.streak} />
            </Grid>
          </Box>

          {/* Charts Section */}
          <Grid container spacing={3} mt={1} mb={8}>
            <Grid
              item
              xs={12}
              md={6}
              lg={6}
              sx={{ width: "50%", flex: "1 1 50%" }}
            >
              <WeeklyActivityChart
                weeklyData={dashboardData.weeklyData}
                calculateWeeklyStats={calculateWeeklyStats}
                formatMinutes={formatMinutes}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              lg={6}
              sx={{ width: "50%", flex: "1 1 50%" }}
            >
              <WorkoutTrendChart
                weeklyData={dashboardData.weeklyData}
                favoriteTime={dashboardData.favoriteTime}
              />
            </Grid>
          </Grid>
        </>
      )}

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={alert.severity}
          variant="filled"
          sx={{ width: "100%" }}
          icon={
            alert.severity === "success" ? (
              <CheckCircleIcon fontSize="inherit" />
            ) : null
          }
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}
