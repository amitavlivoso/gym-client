import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Divider,
  useTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { toast } from "react-toastify";

const plans = [
  {
    id: "basic",
    name: "Basic Plan",
    price: 499,
    duration: "1 Month",
    features: ["Gym Access", "1 Free Trainer Session"],
  },
  {
    id: "standard",
    name: "Standard Plan",
    price: 1299,
    duration: "3 Months",
    features: ["Gym Access", "3 Trainer Sessions", "Diet Plan"],
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: 4499,
    duration: "12 Months",
    features: [
      "All Access",
      "Unlimited Trainer",
      "Diet Plan",
      "Merchandise Pack",
    ],
  },
];

const PaymentCardPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const theme = useTheme();

  const handleSelect = (id) => {
    setSelectedPlan(id);
  };

  const handlePayment = () => {
    if (!selectedPlan) {
      toast.warn("Please select a membership plan!");
      return;
    }

    const plan = plans.find((p) => p.id === selectedPlan);
    toast.success(`Proceeding to payment for: ${plan.name}`);
    console.log("Payment initiated for plan:", plan);
  };

  return (
    <Box sx={{ py: 6, px: 2, background: "#f4f6f8", minHeight: "100vh" }}>
      <Box maxWidth="xl" mx="auto">
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={800}
          gutterBottom
        >
          Choose Your Membership Plan
        </Typography>

        <Typography
          variant="subtitle1"
          textAlign="center"
          mb={5}
          color="text.secondary"
        >
          Select the best plan to power your fitness goals
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan.id}>
              <Card
                onClick={() => handleSelect(plan.id)}
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  background: "rgba(255, 255, 255, 0.85)",
                  backdropFilter: "blur(12px)",
                  border:
                    selectedPlan === plan.id
                      ? "3px solid #1976d2"
                      : "1px solid #ddd",
                  boxShadow: selectedPlan === plan.id ? 8 : 2,
                  borderRadius: 4,
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: 10,
                    transform: "scale(1.03)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {plan.name}
                  </Typography>
                  <Typography variant="h3" color="primary" fontWeight={900}>
                    ₹{plan.price}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {plan.duration}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  {plan.features.map((feature, index) => (
                    <Box
                      key={index}
                      display="flex"
                      alignItems="center"
                      gap={1}
                      mb={1}
                    >
                      <CheckCircleIcon fontSize="small" color="success" />
                      <Typography variant="body2">{feature}</Typography>
                    </Box>
                  ))}
                </CardContent>
                <CardActions sx={{ mt: "auto", p: 2 }}>
                  <Button
                    fullWidth
                    variant={
                      selectedPlan === plan.id ? "contained" : "outlined"
                    }
                    color="primary"
                    onClick={() => handleSelect(plan.id)}
                    sx={{ fontWeight: 600 }}
                  >
                    {selectedPlan === plan.id ? "Selected" : "Choose Plan"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box mt={6} textAlign="center">
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={handlePayment}
            sx={{ px: 5, py: 1.5, fontSize: "1.1rem", fontWeight: 700 }}
          >
            Continue to Payment
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentCardPage;
