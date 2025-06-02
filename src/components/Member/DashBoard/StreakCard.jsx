import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Today } from "@mui/icons-material";

const StreakCard = ({ streak }) => {
  return (
    <Card
      sx={{
        background: "linear-gradient(135deg, #f44336 0%, #e57373 100%)",
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
          <Today sx={{ mr: 1, fontSize: 30 }} />
          <Typography variant="h6" fontWeight="bold">
            Current Streak
          </Typography>
        </Box>
        <Typography variant="h3" fontWeight="bold" sx={{ my: 2 }}>
          {streak} days
        </Typography>
        <Typography variant="body2">Keep it going!</Typography>
      </CardContent>
    </Card>
  );
};

export default StreakCard;
