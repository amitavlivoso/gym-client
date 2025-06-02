import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { FitnessCenter, TrendingUp } from "@mui/icons-material";

const AttendanceCard = ({ sessionCount, monthlySessions }) => {
  return (
    <Card
      sx={{
        background: "linear-gradient(135deg, #4caf50 0%, #81c784 100%)",
        color: "white",
        boxShadow: 3,
        borderRadius: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
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
          <FitnessCenter sx={{ mr: 1, fontSize: 30 }} />{" "}
          <Typography variant="h6" fontWeight="bold">
            Total Sessions
          </Typography>
        </Box>
        <Typography variant="h3" fontWeight="bold" sx={{ my: 2 }}>
          {sessionCount}
        </Typography>
        <Box display="flex" alignItems="center" mt={2} justifyContent="center">
          <TrendingUp sx={{ fontSize: 20, mr: 1 }} />{" "}
          <Typography variant="body2">{monthlySessions} this month</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AttendanceCard;
