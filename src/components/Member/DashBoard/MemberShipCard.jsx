import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { EventAvailable } from "@mui/icons-material";

const MembershipCard = ({ memberShipInfo }) => {
  const expiresAt = memberShipInfo?.expiresAt
    ? new Date(memberShipInfo.expiresAt)
    : null;

  const today = new Date();
  const remainingDays = expiresAt
    ? Math.max(Math.floor((expiresAt - today) / (1000 * 60 * 60 * 24)), 0)
    : null;

  const isRenewEnabled = remainingDays !== null && remainingDays <= 5;

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
          {expiresAt ? expiresAt.toLocaleDateString() : "Not Available"}
        </Typography>

        <Typography variant="body2">
          {expiresAt
            ? `${remainingDays} day${remainingDays !== 1 ? "s" : ""} remaining`
            : "No active membership"}
        </Typography>
      </CardContent>

      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          size="medium"
          disabled={!isRenewEnabled}
          sx={{
            background: isRenewEnabled
              ? "linear-gradient(135deg, #4CAF50 0%, #81C784 100%)"
              : "grey",
            color: "white",
            fontWeight: "bold",
            py: 1,
            borderRadius: "8px",
            ":hover": {
              background: isRenewEnabled
                ? "linear-gradient(135deg, #43A047 0%, #66BB6A 100%)"
                : "grey",
            },
          }}
          onClick={() => {
            if (isRenewEnabled) {
              console.log("Initiate payment flow");
            }
          }}
        >
          Renew Membership
        </Button>
        {!isRenewEnabled && (
          <Typography
            variant="caption"
            sx={{ mt: 1, display: "block", textAlign: "center" }}
          >
            Renewal available 5 days before expiry
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default MembershipCard;
