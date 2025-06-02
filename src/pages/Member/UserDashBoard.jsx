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

  useEffect(() => {
    const userId = getUserId();

    const payload = {
      data: { filter: "", userId },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "DESC"]],
    };

    getAllCheckIn(payload)
      .then((res) => {
        const allSessions = res?.data?.data?.rows || [];
        console.log(allSessions);

        const ongoingSession = allSessions.find(
          (s) => !s.checkOut && s.userId === userId
        );

        if (ongoingSession) {
          setIsCheckedIn(true);
          setOngoingSessionId(ongoingSession.id);
          console.log(ongoingSession);
        }

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const filteredSessions = allSessions.filter((session) => {
          const sessionDate = new Date(session.createdAt);
          return sessionDate >= sevenDaysAgo;
        });
        console.log(filteredSessions);

        setRecentSessions(filteredSessions);

        setDashboardData({
          sessionCount: filteredSessions.length,
          totalMinutes: 560,
          membershipEndsAt: "2025-07-15",
          monthlySessions: 5,
          weeklyData: [
            { day: "Mon", checkIns: 1, duration: 45 },
            { day: "Tue", checkIns: 0, duration: 0 },
            { day: "Wed", checkIns: 2, duration: 90 },
            { day: "Thu", checkIns: 1, duration: 60 },
            { day: "Fri", checkIns: 1, duration: 45 },
            { day: "Sat", checkIns: 0, duration: 0 },
            { day: "Sun", checkIns: 1, duration: 60 },
          ],
          recentSessions: filteredSessions,
          favoriteTime: "Evening (6-9 PM)",
          streak: 3,
          caloriesBurned: 4200,
        });

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setDashboardData({
        sessionCount: 12,
        totalMinutes: 560,
        membershipEndsAt: "2025-07-15",
        monthlySessions: 5,
        weeklyData: [
          { day: "Mon", checkIns: 1, duration: 45 },
          { day: "Tue", checkIns: 0, duration: 0 },
          { day: "Wed", checkIns: 2, duration: 90 },
          { day: "Thu", checkIns: 1, duration: 60 },
          { day: "Fri", checkIns: 1, duration: 45 },
          { day: "Sat", checkIns: 0, duration: 0 },
          { day: "Sun", checkIns: 1, duration: 60 },
        ],
        recentSessions: recentSessions,
        favoriteTime: "Evening (6-9 PM)",
        streak: 3,
        caloriesBurned: 4200,
      });
      setLoading(false);
    }, 1500);
  }, []);

  const handleCheckIn = () => {
    setCheckingIn(true);
    setTimeout(() => {
      const now = new Date();
      const newSession = {
        userId: getUserId(),
        date: now.toISOString().split("T")[0],
        checkIn: now.toISOString(), // ISO for consistent formatting
        checkOut: "", // not checked out yet
      };

      addCheckIn(newSession)
        .then((res) => {
          // Set session in state (but not added to recentSessions yet)
          setIsCheckedIn(true);
          setAlert({
            open: true,
            message: "Checked in successfully! Your workout has started.",
            severity: "success",
          });
        })
        .catch((err) => console.log(err))
        .finally(() => setCheckingIn(false));
    }, 1000);
  };

  const formatMinutes = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };
  const handleCheckOut = () => {
    setCheckingIn(true);
    setTimeout(() => {
      const now = new Date();

      // This must be implemented in backend:
      // Find latest session with `checkOut == null` and update it with `checkOut` and `duration`
      const updatedPayload = {
        checkOutTime: now.toISOString(),
      };

      updateCheckOut(updatedPayload, ongoingSessionId)
        .then(() => {
          // Refetch dashboard data or manually update state
          console.log(ongoingSessionId);
          setIsCheckedIn(false);
          setAlert({
            open: true,
            message: "Checked out successfully!",
            severity: "success",
          });
        })
        .catch((err) => console.log(err))
        .finally(() => setCheckingIn(false));
    }, 1000);
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
