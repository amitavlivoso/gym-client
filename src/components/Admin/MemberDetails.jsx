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
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PaymentIcon from "@mui/icons-material/Payment";
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
  getAllCheckIn,
  getMemberWithAttendance,
  getUser,
} from "../../services/Service";

const MemberDetails = () => {
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [member, setMember] = useState({});
  const [attendance, setAttendance] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    setMember({
      id: id,
      firstName: "Amitav",
      lastName: "Pusty",
      email: "amitav@example.com",
      status: "Active",
      membership: "Gold",
    });

    setAttendance([
      { date: "2025-06-01", status: 1 },
      { date: "2025-06-02", status: 1 },
      { date: "2025-06-03", status: 0 },
      { date: "2025-06-04", status: 1 },
      { date: "2025-06-05", status: 1 },
      { date: "2025-06-06", status: 0 },
      { date: "2025-06-07", status: 1 },
    ]);

    setPayments([
      { month: "January", amount: 1000 },
      { month: "February", amount: 1200 },
      { month: "March", amount: 1000 },
      { month: "April", amount: 1200 },
      { month: "May", amount: 1000 },
    ]);
  }, [id]);

  const [user, setUser] = useState({});
  useEffect(() => {
    getUser(id).then((res) => {
      setUser(res?.data?.data);
    });
  }, []);

  const paymentTotal = payments.reduce((sum, p) => sum + p.amount, 0);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const params = useParams();

  console.log(params.id);
  const userId = params.id;
  useEffect(() => {
    getMemberWithAttendance({ userId }).then((res) => {
      const allRecords = res?.data?.data || [];

      // Generate the last 7 days
      const today = new Date();
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() - (6 - i)); // 6 - i to make dates oldest -> newest
        return d.toISOString().split("T")[0]; // format YYYY-MM-DD
      });

      // Map each day to status (1 if record exists, else 0)
      const attendanceData = last7Days.map((date) => {
        const record = allRecords.find((r) => r.date === date);
        return { date, status: record ? 1 : 0 };
      });

      setAttendance(attendanceData);
    });
  }, [userId]);

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
              {user.firstName}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h6" fontWeight={600}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography color="text.secondary">{user.email}</Typography>
            <Stack direction="row" spacing={1} mt={1}>
              <Chip label={member.status} color="success" />
              <Chip label={`Plan: ${member.membership}`} color="primary" />
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

      {/* Payment Section */}
      <Typography variant="h5" gutterBottom>
        💳 Payment Summary
      </Typography>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" mb={2}>
          Total Paid: ₹{paymentTotal}
        </Typography>
        <Divider sx={{ mb: 3 }} />
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
      </Paper>
    </Box>
  );
};

export default MemberDetails;
