import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Box,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Receipt as ReceiptIcon,
  Payment as PaymentIcon,
  CreditCard as CreditCardIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Error as ErrorIcon,
  Download,
  Email,
  WhatsApp,
} from "@mui/icons-material";
import { getUserId } from "../../services/axiosClient";
import { getAllPayment } from "../../services/Service";
import { jsPDF } from "jspdf"; // Import jsPDF for generating PDFs

const PaymentHistoryTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [payments, setPayments] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const payload = {
      data: { filter: "", userId: getUserId() },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "DESC"]],
    };
    getAllPayment(payload)
      .then((res) => {
        setPayments(res?.data?.data?.rows || []);
      })
      .catch((err) => {
        console.error("Failed to fetch payments:", err);
        setSnackbar({
          open: true,
          message: "Failed to fetch payment history",
          severity: "error",
        });
      });
  }, []);

  const handleDownloadReceipt = (payment) => {
    const doc = new jsPDF();

    // ====== Brand/Company Header ======
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("XYZ Fitness Center", 105, 20, null, null, "center");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("123 Gym Street, Fit City, India", 105, 27, null, null, "center");
    doc.text(
      "📞 +91-9876543210 | ✉️ contact@xyzfitness.com",
      105,
      33,
      null,
      null,
      "center"
    );

    doc.setLineWidth(0.5);
    doc.line(20, 38, 190, 38); // top border

    // ====== Invoice Title & Info ======
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", 20, 50);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Invoice #: ${payment.id}`, 150, 50);
    doc.text(`Date: ${new Date(payment.paidAt).toLocaleDateString()}`, 150, 58);

    // ====== Billed To ======
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Billed To:", 20, 65);

    doc.setFont("helvetica", "normal");
    doc.text("Member Name", 20, 72); // Replace with actual user name if available
    doc.text("Email: user@example.com", 20, 78); // Replace with actual email

    // ====== Invoice Table ======
    let tableStartY = 90;

    doc.setFont("helvetica", "bold");
    doc.setFillColor(230, 230, 230);
    doc.rect(20, tableStartY, 170, 10, "F");

    doc.text("Description", 25, tableStartY + 7);
    doc.text("Plan", 100, tableStartY + 7);
    doc.text("Amount", 160, tableStartY + 7);

    doc.setFont("helvetica", "normal");
    doc.rect(20, tableStartY + 10, 170, 10);
    doc.text("Gym Membership", 25, tableStartY + 17);
    doc.text(payment.planName, 100, tableStartY + 17);
    doc.text(`₹${payment.amount.toLocaleString()}`, 160, tableStartY + 17);

    // ====== Payment Details ======
    const detailsY = tableStartY + 30;

    doc.setFont("helvetica", "bold");
    doc.text("Payment Details:", 20, detailsY);

    doc.setFont("helvetica", "normal");
    doc.text(`Payment Method: ${payment.method}`, 20, detailsY + 8);
    doc.text(`Status: ${payment.status}`, 20, detailsY + 16);
    doc.text(
      `Valid Till: ${new Date(payment.expiresAt).toLocaleDateString()}`,
      20,
      detailsY + 24
    );

    // ====== Total Summary ======
    doc.setFont("helvetica", "bold");
    doc.text("Total Amount Paid:", 120, detailsY + 32);
    doc.text(
      `₹${payment.amount.toLocaleString()}`,
      170,
      detailsY + 32,
      null,
      null,
      "right"
    );

    // ====== Footer ======
    doc.setLineWidth(0.1);
    doc.line(20, 250, 190, 250);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Thank you for your payment!", 105, 258, null, null, "center");
    doc.text(
      "This is a computer-generated invoice. No signature is required.",
      105,
      264,
      null,
      null,
      "center"
    );

    doc.save(`Invoice_${payment.id}.pdf`);

    setSnackbar({
      open: true,
      message: "Invoice downloaded successfully",
      severity: "success",
    });
  };

  const handleEmailReceipt = (payment) => {
    const emailSubject = `Payment Receipt #${payment.id}`;
    const emailBody = `Dear Member,

Here is your payment receipt details:

Payment ID: ${payment.id}
Plan: ${payment.planName}
Amount: ₹${payment.amount.toLocaleString()}
Status: ${payment.status}
Payment Method: ${payment.method}
Paid On: ${new Date(payment.paidAt).toLocaleDateString()}
Valid Till: ${new Date(payment.expiresAt).toLocaleDateString()}

Thank you for your payment!`;

    window.open(
      `mailto:?subject=${encodeURIComponent(
        emailSubject
      )}&body=${encodeURIComponent(emailBody)}`
    );

    setSnackbar({
      open: true,
      message: "Email client opened with receipt details",
      severity: "success",
    });
  };

  const handleWhatsAppReceipt = (payment) => {
    const message = `*Payment Receipt #${payment.id}*

*Plan:* ${payment.planName}
*Amount:* ₹${payment.amount.toLocaleString()}
*Status:* ${payment.status}
*Method:* ${payment.method}
*Paid On:* ${new Date(payment.paidAt).toLocaleDateString()}
*Valid Till:* ${new Date(payment.expiresAt).toLocaleDateString()}`;

    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);

    setSnackbar({
      open: true,
      message: "WhatsApp opened with receipt details",
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getStatusChip = (status) => {
    switch (status) {
      case "PAID":
        return (
          <Chip
            icon={<CheckCircleIcon fontSize="small" />}
            label="Paid"
            color="success"
            size="small"
            variant="outlined"
          />
        );
      case "PENDING":
        return (
          <Chip
            icon={<PendingIcon fontSize="small" />}
            label="Pending"
            color="warning"
            size="small"
            variant="outlined"
          />
        );
      case "FAILED":
        return (
          <Chip
            icon={<ErrorIcon fontSize="small" />}
            label="Failed"
            color="error"
            size="small"
            variant="outlined"
          />
        );
      default:
        return <Chip label={status} size="small" />;
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case "Credit Card":
        return <CreditCardIcon fontSize="small" />;
      case "Razorpay":
        return <PaymentIcon fontSize="small" />;
      case "Bank Transfer":
        return <ReceiptIcon fontSize="small" />;
      default:
        return <PaymentIcon fontSize="small" />;
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: "bold" }}>
        <PaymentIcon sx={{ mr: 1, verticalAlign: "middle" }} />
        Payment History
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table aria-label="payment history table">
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
              <TableCell sx={{ fontWeight: "bold" }}>Payment ID</TableCell>
              {!isMobile && (
                <>
                  <TableCell sx={{ fontWeight: "bold" }}>Paid On</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Valid Till</TableCell>
                </>
              )}
              <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Method</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              {!isMobile && (
                <TableCell sx={{ fontWeight: "bold" }}>Plan</TableCell>
              )}
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                    {payment.id}
                  </Typography>
                </TableCell>

                {!isMobile && (
                  <>
                    <TableCell>
                      {new Date(payment.paidAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(payment.expiresAt).toLocaleDateString()}
                    </TableCell>
                  </>
                )}

                <TableCell>
                  <Typography fontWeight="bold">
                    ₹{payment.amount.toLocaleString()}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Box display="flex" alignItems="center">
                    {getMethodIcon(payment.method)}
                    <Typography sx={{ ml: 1 }}>{payment.method}</Typography>
                  </Box>
                </TableCell>

                <TableCell>{getStatusChip(payment.status)}</TableCell>

                {!isMobile && (
                  <TableCell>
                    <Typography variant="body2">{payment.planName}</Typography>
                  </TableCell>
                )}

                <TableCell>
                  <Box display="flex">
                    <Tooltip title="Download Receipt">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleDownloadReceipt(payment)}
                        sx={{ mr: 1 }}
                      >
                        <Download fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Email Receipt">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEmailReceipt(payment)}
                        sx={{ mr: 1 }}
                      >
                        <Email fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Share via WhatsApp">
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() => handleWhatsAppReceipt(payment)}
                      >
                        <WhatsApp fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PaymentHistoryTable;
