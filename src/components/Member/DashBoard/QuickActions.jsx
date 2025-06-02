import React from "react";
import {
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { FitnessCenter } from "@mui/icons-material";

const QuickActions = ({
  handleCheckIn,
  handleCheckOut,
  checkingIn,
  isCheckedIn,
  caloriesBurned,
  totalMinutes,
  sessionCount,
}) => {
  const formatMinutes = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", mb: 2 }}
      >
        <FitnessCenter color="primary" sx={{ mr: 1 }} /> Quick Actions
      </Typography>

      <Button
        fullWidth
        variant="contained"
        onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
        disabled={checkingIn}
        size="large"
        sx={{
          background: isCheckedIn
            ? "linear-gradient(135deg, #f44336 0%, #e57373 100%)"
            : "linear-gradient(135deg, #673ab7 0%, #9575cd 100%)",
          color: "#fff",
          py: 2,
          fontWeight: "bold",
          borderRadius: "12px",
          mb: 3,
          ":hover": {
            background: isCheckedIn
              ? "linear-gradient(135deg, #d32f2f 0%, #ef5350 100%)"
              : "linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%)",
          },
        }}
      >
        {checkingIn ? (
          <>
            <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
            {isCheckedIn ? "Checking Out..." : "Checking In..."}
          </>
        ) : isCheckedIn ? (
          "Check Out"
        ) : (
          "Check In Now"
        )}
      </Button>

      <Box sx={{ mt: "auto" }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
          Stats Summary
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={1.5}>
          <Typography variant="body2">Calories burned:</Typography>
          <Typography fontWeight="bold" color="primary.main">
            {caloriesBurned.toLocaleString()}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={1.5}>
          <Typography variant="body2">Avg. session:</Typography>
          <Typography fontWeight="bold" color="primary.main">
            {formatMinutes(Math.round(totalMinutes / sessionCount))}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Workouts/week:</Typography>
          <Typography fontWeight="bold" color="primary.main">
            {Math.round(sessionCount / 4)}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default QuickActions;
