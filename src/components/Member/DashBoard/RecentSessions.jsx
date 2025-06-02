import React from "react";
import { Paper, Typography, Box, Divider, Chip } from "@mui/material";
import { Today } from "@mui/icons-material";

const RecentSessions = ({ recentSessions, formatMinutes }) => {
  const formatTime = (isoString) => {
    if (!isoString) return "--";
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateDuration = (checkInTime, checkOutTime) => {
    if (!checkInTime || !checkOutTime) return 0;
    const start = new Date(checkInTime);
    const end = new Date(checkOutTime);
    const diffInMs = end - start;
    return Math.floor(diffInMs / 60000); // convert ms to minutes
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
        <Today color="primary" sx={{ mr: 1 }} /> Recent Workout Sessions
      </Typography>

      <Box
        sx={{
          overflowY: "auto",
          flexGrow: 1,
          maxHeight: recentSessions.length > 3 ? "300px" : "auto", // scrolling if > 3 sessions
          pr: 1,
        }}
      >
        {recentSessions.map((session, index) => {
          const duration = session.duration
            ? session.duration
            : calculateDuration(session.checkInTime, session.checkOutTime);

          return (
            <Box key={index} mb={2}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="bold">
                  {new Date(session.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
                <Chip
                  label={formatMinutes(duration)}
                  color="info"
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                mt={0.5}
                sx={{ color: "text.secondary" }}
              >
                <Typography variant="body2">
                  Check-in: {formatTime(session.checkInTime)}
                </Typography>
                <Typography
                  variant="body2"
                  color={
                    !session.checkOutTime ? "success.main" : "text.secondary"
                  }
                >
                  {session.checkOutTime
                    ? `Check-out: ${formatTime(session.checkOutTime)}`
                    : "🟢 Ongoing Session"}
                </Typography>
              </Box>
              {index < recentSessions.length - 1 && (
                <Divider sx={{ mt: 1.5 }} />
              )}
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

export default RecentSessions;
