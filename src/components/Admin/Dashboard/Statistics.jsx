import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  MenuItem,
  Select,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const monthlyIncome = [
  { name: "Jan", income: 1200 },
  { name: "Feb", income: 1600 },
  { name: "Mar", income: 1800 },
  { name: "Apr", income: 900 },
  { name: "May", income: 2000 },
  { name: "Jun", income: 1700 },
];

const weeklyIncome = {
  Jan: [
    { name: "Week 1", income: 300 },
    { name: "Week 2", income: 200 },
    { name: "Week 3", income: 400 },
    { name: "Week 4", income: 300 },
  ],
  Feb: [
    { name: "Week 1", income: 400 },
    { name: "Week 2", income: 400 },
    { name: "Week 3", income: 400 },
    { name: "Week 4", income: 400 },
  ],
  Mar: [
    { name: "Week 1", income: 500 },
    { name: "Week 2", income: 400 },
    { name: "Week 3", income: 500 },
    { name: "Week 4", income: 400 },
  ],
  Apr: [
    { name: "Week 1", income: 200 },
    { name: "Week 2", income: 200 },
    { name: "Week 3", income: 250 },
    { name: "Week 4", income: 250 },
  ],
  May: [
    { name: "Week 1", income: 600 },
    { name: "Week 2", income: 500 },
    { name: "Week 3", income: 500 },
    { name: "Week 4", income: 400 },
  ],
  Jun: [
    { name: "Week 1", income: 400 },
    { name: "Week 2", income: 400 },
    { name: "Week 3", income: 500 },
    { name: "Week 4", income: 400 },
  ],
};

const monthlyUsers = [
  { name: "Jan", users: 100 },
  { name: "Feb", users: 130 },
  { name: "Mar", users: 160 },
  { name: "Apr", users: 80 },
  { name: "May", users: 190 },
  { name: "Jun", users: 150 },
];

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

const PaymentDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("Jan");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ px: 2, py: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Payment Dashboard
        </Typography>
        <Select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          size="small"
        >
          {months.map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 3, height: 300 }}>
            <Typography variant="subtitle1" gutterBottom>
              Monthly Income
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyIncome}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke={theme.palette.primary.main}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 3, height: 300 }}>
            <Typography variant="subtitle1" gutterBottom>
              Weekly Income - {selectedMonth}
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyIncome[selectedMonth]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill={theme.palette.success.main} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, borderRadius: 3, height: 300 }}>
            <Typography variant="subtitle1" gutterBottom>
              Monthly User Visits
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyUsers}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={theme.palette.primary.main}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={theme.palette.primary.main}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke={theme.palette.primary.main}
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentDashboard;
