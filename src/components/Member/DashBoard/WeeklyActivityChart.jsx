import React from "react";
import { Paper, Typography, Box, Chip } from "@mui/material";
import { BarChart, CheckCircle, Schedule } from "@mui/icons-material";
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const WeeklyActivityChart = ({
  weeklyData,
  calculateWeeklyStats,
  formatMinutes,
}) => {
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
        <BarChart color="primary" sx={{ mr: 1 }} /> Weekly Activity
      </Typography>
      <Box sx={{ height: 300, flexGrow: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="checkIns"
              name="Check-ins"
              fill="#8884d8"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="right"
              dataKey="duration"
              name="Minutes"
              fill="#82ca9d"
              radius={[4, 4, 0, 0]}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </Box>
      <Box display="flex" justifyContent="space-between" mt={1}>
        <Chip
          icon={<CheckCircle fontSize="small" />}
          label={`${calculateWeeklyStats().totalCheckIns} check-ins`}
          color="primary"
        />
        <Chip
          icon={<Schedule fontSize="small" />}
          label={`${formatMinutes(calculateWeeklyStats().totalDuration)} spent`}
          color="success"
        />
      </Box>
    </Paper>
  );
};

export default WeeklyActivityChart;
