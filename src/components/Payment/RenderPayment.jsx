import React, { useState } from "react";
import { verifyPayment, createPayment } from "../../services/Service";
import { R_KEY_ID } from "../../services/Secret";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import color from "../shared/Color";
import { toast } from "react-toastify";

const RenderRazorpay = ({ orderDetails, amount, courseId, userId }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const loadScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const displayRazorpay = async () => {
    const isScriptLoaded = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!isScriptLoaded || !window.Razorpay) {
      toast.error("Razorpay SDK load failed.");
      return;
    }

    const options = {
      key: R_KEY_ID,
      amount: orderDetails.amount,
      currency: orderDetails.currency,
      name: "Livoso", // ✅ Brand Name
      description: `Payment for ${orderDetails.selectedPlan.name}`,
      image: "/logo.png", // Optional brand logo
      order_id: orderDetails.id,
      theme: {
        color: "#6a11cb", // ✅ Brand Color
      },
      prefill: {
        name: "Livoso User",
        email: "user@example.com",
        contact: "9999999999",
      },
      handler: async (response) => {
        try {
          // ✅ Step 1: Verify Payment
          await verifyPayment({
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          });

          // ✅ Step 2: Save in Database
          const payload = {
            userId: userId,
            planName: orderDetails.selectedPlan.name,
            amount: orderDetails.amount / 100, // convert paise to INR
            status: "PAID",
            method: "Razorpay",
            paidAt: new Date(),
            expiresAt: calculateExpiry(orderDetails.selectedPlan.duration),
          };

          await createPayment(payload);

          toast.success("🎉 Payment successful! Welcome to Livoso.");
          setOpen(false);

          // ✅ Redirect after success
          navigate("/user/dashboard");
        } catch (error) {
          console.error("Verification failed", error);
          toast.error("Payment verification failed. Please try again.");
        }
      },
      modal: {
        ondismiss: () => {
          toast.info("Payment cancelled by user.");
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const calculateExpiry = (duration) => {
    const today = new Date();
    switch (duration) {
      case "1 Month":
        today.setMonth(today.getMonth() + 1);
        break;
      case "3 Months":
        today.setMonth(today.getMonth() + 3);
        break;
      case "12 Months":
        today.setFullYear(today.getFullYear() + 1);
        break;
      default:
        today.setMonth(today.getMonth() + 1);
    }
    return today.toISOString().split("T")[0]; // format YYYY-MM-DD
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="xs"
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          padding: "8px",
          borderRadius: "16px",
        },
      }}
    >
      <DialogTitle>Complete Your Payment</DialogTitle>
      <DialogContent>
        <p>You're one step away from activating your Livoso plan.</p>
      </DialogContent>
      <DialogActions style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          style={{ textTransform: "none", color: "black" }}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          onClick={displayRazorpay}
          variant="contained"
          style={{
            background: color.firstColor,
            fontSize: "18px",
            textTransform: "none",
            border: "solid 1px white",
          }}
          sx={{
            padding: "2px 10px",
            transition: "all 0.4s ease",
            "&:hover": {
              paddingRight: "20px",
            },
          }}
        >
          Proceed to Pay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RenderRazorpay;
