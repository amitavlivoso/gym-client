import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { TrendingUp } from "@mui/icons-material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const WorkoutTrendChart = ({ weeklyData, favoriteTime }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center" }}
      >
        <TrendingUp color="primary" sx={{ mr: 1 }} /> Workout Duration Trend
      </Typography>
      <Box sx={{ height: 300, flexGrow: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="duration"
              name="Minutes"
              stroke="#ff9800"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Typography variant="body2" color="text.secondary" mt={1}>
        Your preferred workout time: <strong>{favoriteTime}</strong>
      </Typography>
    </Paper>
  );
};

export default WorkoutTrendChart;
