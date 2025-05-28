"use client";
import { Box, Container, Typography, Grid } from "@mui/material";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const features = [
  {
    icon: <FingerprintIcon sx={{ fontSize: 50, color: "#FFD700" }} />,
    title: "Biometric Check-In",
    description: "Fast, secure entry with fingerprint and face ID integration.",
  },
  {
    icon: <SmartphoneIcon sx={{ fontSize: 50, color: "#FFD700" }} />,
    title: "Mobile App Access",
    description: "Track attendance, workouts, and payments from your phone.",
  },
  {
    icon: <FitnessCenterIcon sx={{ fontSize: 50, color: "#FFD700" }} />,
    title: "Trainer-Led Programs",
    description: "Custom fitness plans from certified trainers.",
  },
  {
    icon: <WhatsAppIcon sx={{ fontSize: 50, color: "#FFD700" }} />,
    title: "WhatsApp Notifications",
    description: "Get reminders for payments, renewals, and sessions.",
  },
];

export default function FeaturesOverview() {
  return (
    <Box
      sx={{
        py: 10,
        backgroundColor: "#000",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 6,
            color: "#FFD700",
            textTransform: "uppercase",
          }}
        >
          Features Overview
        </Typography>
        <Grid container spacing={6}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  p: 4,
                  backgroundColor: "#1a1a1a",
                  borderRadius: 4,
                  boxShadow: 3,
                  height: "100%",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 20px rgba(255, 215, 0, 0.3)",
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#ccc" }}>
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
