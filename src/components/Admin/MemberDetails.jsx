import {
  Box,
  Typography,
  Paper,
  Divider,
  Grid,
  Avatar,
  useMediaQuery,
  useTheme,
  Stack,
  Chip,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMemberWithAttendance,
  getUser,
  getAllPayment,
} from "../../services/Service";
import { getUserRoll } from "../../services/axiosClient";

const MemberDetails = () => {
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [user, setUser] = useState({});
  const [attendance, setAttendance] = useState([]);
  const [payments, setPayments] = useState([]);

  // Fetch user info
  useEffect(() => {
    getUser(id).then((res) => {
      setUser(res?.data?.data || {});
    });
  }, [id]);

  // Fetch attendance data for last 7 days
  useEffect(() => {
    const userId = id;
    getMemberWithAttendance({ userId }).then((res) => {
      const allRecords = res?.data?.data || [];

      const today = new Date();
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() - (6 - i));
        return d.toISOString().split("T")[0];
      });

      const attendanceData = last7Days.map((date) => {
        const record = allRecords.find((r) => r.date === date);
        return { date, status: record ? 1 : 0 };
      });

      setAttendance(attendanceData);
    });
  }, [id]);

  // Fetch and process payment data month-wise
  useEffect(() => {
    const payload = {
      data: { filter: "", userId: id },
      page: 0,
      pageSize: 100,
      order: [["paidAt", "DESC"]],
    };

    getAllPayment(payload)
      .then((res) => {
        const rows = res?.data?.data?.rows || [];

        const monthMap = {};

        rows.forEach((payment) => {
          if (!payment.paidAt || !payment.amount) return;

          const date = new Date(payment.paidAt);
          const month = date.toLocaleString("default", { month: "long" });

          if (!monthMap[month]) {
            monthMap[month] = 0;
          }
          monthMap[month] += payment.amount;
        });

        const processed = Object.entries(monthMap).map(([month, amount]) => ({
          month,
          amount,
        }));

        setPayments(processed);
      })
      .catch((err) => {
        console.error("Error fetching payments:", err);
      });
  }, [id]);

  const paymentTotal = payments.reduce((sum, p) => sum + p.amount, 0);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC"];

  return (
    <Box p={isMobile ? 2 : 4}>
      {/* Title */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        👤 Member Profile
      </Typography>

      {/* Member Info */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          background: "linear-gradient(145deg, #f4f4f4, #ffffff)",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar sx={{ width: 80, height: 80, bgcolor: "#1976d2" }}>
              {user.firstName?.[0] || "U"}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h6" fontWeight={600}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography color="text.secondary">{user.email}</Typography>
            <Stack direction="row" spacing={1} mt={1}>
              <Chip label="Active" color="success" />
              <Chip
                label={`Plan: ${user.membership || "N/A"}`}
                color="primary"
              />
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Attendance Section */}
      <Typography variant="h5" gutterBottom>
        📅 Attendance Overview
      </Typography>
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={attendance}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="status"
              stroke="#1976d2"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
      {getUserRoll() === "Admin" || getUserRoll() === "Receptionist" ? (
        <>
          <Typography variant="h5" gutterBottom>
            💳 Payment Summary
          </Typography>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" mb={2}>
              Total Paid: ₹{paymentTotal.toLocaleString()}
            </Typography>
            <Divider sx={{ mb: 3 }} />
            {payments.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={payments}
                    dataKey="amount"
                    nameKey="month"
                    outerRadius={90}
                    label
                  >
                    {payments.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No payment records found.
              </Typography>
            )}
          </Paper>
        </>
      ) : (
        <></>
      )}
      {/* Payment Section */}
    </Box>
  );
};

export default MemberDetails;
