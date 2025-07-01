import React, { useEffect, useState } from "react";
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
import RenderRazorpay from "../../components/Payment/RenderPayment";
import { createOrder, getAllPaymentForUser } from "../../services/Service";
import { getUserId } from "../../services/axiosClient";
import { useLocation } from "react-router-dom";

const PaymentCardPage = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const theme = useTheme();
  const location = useLocation();
  const userId = location.state?.userId;
  console.log(userId);

  useEffect(() => {
    const payLoad = {
      data: { filter: "" },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "ASC"]],
    };
    getAllPaymentForUser(payLoad)
      .then((res) => {
        const rows = res?.data?.data?.rows || [];
        setPlans(rows);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSelect = (id) => {
    setSelectedPlan(id);
  };

  const handlePayment = async () => {
    if (!selectedPlan) {
      toast.warn("Please select a membership plan!");
      return;
    }

    const plan = plans.find((p) => p.id === selectedPlan);
    toast.info(`Processing payment for: ${plan.name}`);

    try {
      const payLoad = {
        amount: plan.price,
        currency: "INR",
      };

      const response = await createOrder(payLoad);

      setOrderDetails({
        ...response.data.data,
        selectedPlan: plan,
      });
    } catch (err) {
      console.error("Razorpay order creation failed:", err);
      toast.error("Payment initialization failed. Try again.");
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 3, sm: 6 },
        px: { xs: 1, sm: 2 },
        background: "radial-gradient(circle at top, #f8f9ff, #eef1ff)",
        minHeight: "100vh",
      }}
    >
      <Box maxWidth="xl" mx="auto" mt={4}>
        <Box textAlign="center" mb={{ xs: 4, sm: 6 }}>
          <Typography
            variant="h3"
            fontWeight={800}
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.5px",
            }}
          >
            Choose Your Livoso Plan
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
              maxWidth: "600px",
              mx: "auto",
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            Select the perfect plan to power your fitness journey with premium
            benefits and expert guidance
          </Typography>
        </Box>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="stretch"
        >
          {plans.map((plan) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={plan.id}
              sx={{
                display: "flex",
                justifyContent: "center",
                order: plan.popular ? 1 : plan.id === "basic" ? 0 : 2,
              }}
            >
              <Card
                onClick={() => handleSelect(plan.id)}
                sx={{
                  width: "100%",
                  maxWidth: "400px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  background:
                    selectedPlan === plan.id
                      ? "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(245,247,255,0.95))"
                      : "rgba(255,255,255,0.95)",
                  borderRadius: "16px",
                  border:
                    selectedPlan === plan.id
                      ? "2px solid #2575fc"
                      : plan.popular
                      ? "2px solid #6a11cb"
                      : "1px solid rgba(0,0,0,0.08)",
                  boxShadow:
                    selectedPlan === plan.id
                      ? "0 20px 30px rgba(37,117,252,0.2)"
                      : plan.popular
                      ? "0 30px 50px rgba(106,17,203,0.25)"
                      : "0 10px 20px rgba(0,0,0,0.05)",
                  cursor: "pointer",
                  transition: "0.3s",
                  position: "relative",
                  transform:
                    selectedPlan === plan.id ? "translateY(-4px)" : "none",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 25px 40px rgba(37,117,252,0.25)",
                  },
                }}
              >
                {/* {plan.popular && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: -50,
                      left: "50%",
                      transform: "translateX(-50%)",
                      bgcolor: "#6a11cb",
                      color: "#fff",
                      px: 2.5,
                      py: 0.5,
                      borderRadius: "20px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      boxShadow: "0 4px 10px rgba(106,17,203,0.3)",
                      zIndex: 2,
                    }}
                  >
                    MOST POPULAR
                  </Box>
                )} */}

                <CardContent>
                  <Typography variant="h5" fontWeight={700}>
                    {plan.name}
                    {selectedPlan === plan.id && (
                      <CheckCircleIcon
                        fontSize="small"
                        color="primary"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "flex-end", my: 1 }}>
                    <Typography
                      variant="h3"
                      fontWeight={800}
                      sx={{
                        background:
                          selectedPlan === plan.id
                            ? "linear-gradient(90deg, #6a11cb, #2575fc)"
                            : "linear-gradient(90deg, #333, #555)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      ₹{plan.price}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ ml: 1 }}>
                      / {plan.period} Months
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box>
                    {plan.features.map((feature, index) => (
                      <Box
                        key={index}
                        display="flex"
                        alignItems="center"
                        mb={1}
                      >
                        <CheckCircleIcon
                          fontSize="small"
                          color="success"
                          sx={{ mr: 1 }}
                        />
                        <Typography>{feature}</Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>

                <CardActions sx={{ px: 3, pb: 3 }}>
                  <Button
                    fullWidth
                    variant={
                      selectedPlan === plan.id ? "contained" : "outlined"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(plan.id);
                    }}
                    color="primary"
                  >
                    {selectedPlan === plan.id ? "Selected" : "Choose Plan"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Payment Button */}
        <Box mt={6} textAlign="center">
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={handlePayment}
            disabled={!selectedPlan}
            sx={{
              px: 6,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 700,
              borderRadius: "14px",
              background: selectedPlan
                ? "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)"
                : "rgba(0,0,0,0.1)",
              color: "white",
              boxShadow: selectedPlan
                ? "0 10px 25px rgba(37,117,252,0.4)"
                : "none",
              "&:hover": {
                background: selectedPlan
                  ? "linear-gradient(90deg, #5a0db4 0%, #1c6ae4 100%)"
                  : "rgba(0,0,0,0.1)",
              },
              "&:disabled": {
                background: "rgba(0,0,0,0.05)",
                color: "rgba(0,0,0,0.25)",
              },
            }}
          >
            {selectedPlan ? "Continue to Payment" : "Select a Plan"}
          </Button>
        </Box>

        {/* Razorpay Payment Trigger */}
        {orderDetails && (
          <RenderRazorpay
            orderDetails={orderDetails}
            amount={orderDetails.selectedPlan.price}
            courseId={orderDetails.selectedPlan.id}
            userId={userId}
          />
        )}
      </Box>
    </Box>
  );
};

export default PaymentCardPage;
