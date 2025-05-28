"use client";
import { Box, Container, Typography, Grid, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const benefits = [
  {
    icon: <AccessTimeIcon sx={{ fontSize: 50, color: "#FFD700" }} />,
    title: "24/7 Gym Access",
    description:
      "Workout anytime that suits your schedule with round-the-clock access.",
  },
  {
    icon: <FitnessCenterIcon sx={{ fontSize: 50, color: "#FFD700" }} />,
    title: "Expert Trainers",
    description:
      "Certified and experienced trainers to guide you through every step.",
  },
  {
    icon: <WhatsAppIcon sx={{ fontSize: 50, color: "#FFD700" }} />,
    title: "WhatsApp Reminders",
    description:
      "Get timely updates and reminders on WhatsApp for sessions and payments.",
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 50, color: "#FFD700" }} />,
    title: "Dedicated Support",
    description:
      "Friendly support staff available to assist with any queries or help.",
  },
];

// Replace with your actual WhatsApp number (include country code, no symbols)
const whatsappNumber = "919124538064";

export default function WhyChooseUs() {
  return (
    <Box
      sx={{
        py: 10,
        backgroundColor: "#111",
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
            letterSpacing: 2,
          }}
        >
          Why Choose Us?
        </Typography>

        <Grid container spacing={6}>
          {benefits.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  p: 4,
                  backgroundColor: "#1c1c1c",
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
                <Box sx={{ mb: 2 }}>{item.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#ccc" }}>
                  {item.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* WhatsApp Contact Button */}
        <Box sx={{ mt: 8 }}>
          <Button
            variant="contained"
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<WhatsAppIcon />}
            sx={{
              backgroundColor: "#25D366",
              "&:hover": {
                backgroundColor: "#1ebe5d",
              },
              fontWeight: 700,
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontSize: "1rem",
            }}
          >
            Chat with us on WhatsApp
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
