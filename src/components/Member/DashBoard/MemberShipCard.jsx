import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { EventAvailable } from "@mui/icons-material";

const MembershipCard = ({ membershipEndsAt }) => {
  return (
    <Card
      sx={{
        background: "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)",
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
          <EventAvailable sx={{ mr: 1, fontSize: 30 }} />
          <Typography variant="h6" fontWeight="bold">
            Membership
          </Typography>
        </Box>
        <Typography variant="h4" fontWeight="bold" sx={{ my: 2 }}>
          {new Date(membershipEndsAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body2">
          {Math.floor(
            (new Date(membershipEndsAt) - new Date()) / (1000 * 60 * 60 * 24)
          )}{" "}
          days remaining
        </Typography>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          size="medium"
          sx={{
            background: "linear-gradient(135deg, #4CAF50 0%, #81C784 100%)",
            color: "white",
            fontWeight: "bold",
            py: 1,
            borderRadius: "8px",
            ":hover": {
              background: "linear-gradient(135deg, #43A047 0%, #66BB6A 100%)",
            },
          }}
          onClick={() => {
            /* Add payment integration here */
            console.log("Initiate payment flow");
          }}
        >
          Renew Membership
        </Button>
      </Box>
    </Card>
  );
};

export default MembershipCard;
