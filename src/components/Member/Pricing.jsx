"use client";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
} from "@mui/material";

const plans = [
  {
    title: "Yearly Membership",
    price: "₹9,999",
    duration: "12 Months",
    features: [
      "Unlimited Gym Access",
      "1 Personal Training Session / Month",
      "Free Diet Consultation",
      "Priority Support",
    ],
  },
  {
    title: "Half-Yearly Membership",
    price: "₹5,999",
    duration: "6 Months",
    features: [
      "Unlimited Gym Access",
      "1 Personal Training Session / 2 Months",
      "Free Diet Consultation",
    ],
  },
  {
    title: "Quarterly Membership",
    price: "₹3,499",
    duration: "3 Months",
    features: ["Unlimited Gym Access", "Group Training Sessions"],
  },
];

export default function Pricing() {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
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
            letterSpacing: 2,
          }}
        >
          Membership Pricing
        </Typography>

        <Grid container spacing={6}>
          {plans.map((plan, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card
                sx={{
                  height: "100%",
                  backgroundColor: "#111",
                  border: "2px solid #FFD700",
                  borderRadius: 4,
                  boxShadow: 4,
                  transition: "transform 0.3s, border-color 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    borderColor: "#FFC107",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "#FFD700",
                      mb: 2,
                      letterSpacing: 1,
                    }}
                  >
                    {plan.title}
                  </Typography>

                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 900,
                      mb: 1,
                      color: "#FFD700",
                    }}
                  >
                    {plan.price}
                  </Typography>

                  <Typography variant="subtitle1" sx={{ color: "#ccc", mb: 3 }}>
                    {plan.duration}
                  </Typography>

                  <Divider
                    sx={{
                      borderColor: "#444",
                      mb: 3,
                    }}
                  />

                  <Box
                    sx={{
                      textAlign: "left",
                      mb: 4,
                      px: 1,
                    }}
                  >
                    {plan.features.map((feature, i) => (
                      <Typography
                        key={i}
                        variant="body2"
                        sx={{ mb: 1.2, color: "#ccc" }}
                      >
                        • {feature}
                      </Typography>
                    ))}
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: "#FFD700",
                      color: "#000",
                      fontWeight: "bold",
                      borderRadius: 2,
                      fontSize: "1rem",
                      "&:hover": {
                        backgroundColor: "#FFC107",
                      },
                    }}
                  >
                    Join Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
