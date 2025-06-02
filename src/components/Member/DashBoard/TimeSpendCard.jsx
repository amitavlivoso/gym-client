import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { AccessTime } from "@mui/icons-material";

const TimeSpentCard = ({ totalMinutes, formatMinutes }) => {
  return (
    <Card
      sx={{
        background: "linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)",
        color: "white",
        boxShadow: 3,
        borderRadius: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minWidth: 280,
        maxWidth: 300,
        mx: "auto",
        p: 2,
      }}
    >
      <CardContent
        sx={{
          textAlign: "center",
          px: 3,
          py: 2,
        }}
      >
        <Box display="flex" alignItems="center" mb={2} justifyContent="center">
          <AccessTime sx={{ mr: 1, fontSize: 30 }} />
          <Typography variant="h6" fontWeight="bold">
            Total Time
          </Typography>
        </Box>
        <Typography variant="h3" fontWeight="bold" sx={{ my: 2 }}>
          {formatMinutes(totalMinutes)}
        </Typography>
        <Typography variant="body2">
          {Math.round(totalMinutes / 60)} full workouts
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TimeSpentCard;
