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
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  Grid
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

const PaymentHistoryTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [payments, setPayments] = useState([]);
  const [openReceipt, setOpenReceipt] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
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

  const handleViewReceipt = (payment) => {
    setSelectedPayment(payment);
    setOpenReceipt(true);
  };

  const handleCloseReceipt = () => {
    setOpenReceipt(false);
    setSelectedPayment(null);
  };

  const handleDownloadReceipt = (payment) => {
    const receiptContent = `
      Payment Receipt
      ===============
      
      Payment ID: ${payment.id}
      Plan: ${payment.planName}
      Amount: ₹${payment.amount.toLocaleString()}
      Status: ${payment.status}
      Method: ${payment.method}
      Paid On: ${new Date(payment.paidAt).toLocaleDateString()}
      Valid Till: ${new Date(payment.expiresAt).toLocaleDateString()}
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt_${payment.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setSnackbar({
      open: true,
      message: "Receipt downloaded successfully",
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

    window.open(`mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`);
    
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PaymentHistoryTable;