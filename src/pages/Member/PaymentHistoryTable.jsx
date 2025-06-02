import React from "react";
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
} from "@mui/material";
import {
  Receipt as ReceiptIcon,
  Payment as PaymentIcon,
  CreditCard as CreditCardIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";

const PaymentHistoryTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Sample payment data
  const payments = [
    {
      id: "PAY-78901",
      date: "2023-06-15",
      amount: 99.99,
      method: "Credit Card",
      status: "Completed",
      type: "Membership Renewal",
      card: "•••• •••• •••• 4242",
    },
    {
      id: "PAY-78902",
      date: "2023-05-10",
      amount: 29.99,
      method: "PayPal",
      status: "Completed",
      type: "Personal Training",
      card: "paypal@example.com",
    },
    {
      id: "PAY-78903",
      date: "2023-04-05",
      amount: 99.99,
      method: "Credit Card",
      status: "Failed",
      type: "Membership Renewal",
      card: "•••• •••• •••• 4242",
    },
    {
      id: "PAY-78904",
      date: "2023-03-28",
      amount: 49.99,
      method: "Bank Transfer",
      status: "Pending",
      type: "Supplement Purchase",
      card: "ACCT •••• 6789",
    },
    {
      id: "PAY-78905",
      date: "2023-02-15",
      amount: 99.99,
      method: "Credit Card",
      status: "Completed",
      type: "Membership Renewal",
      card: "•••• •••• •••• 4242",
    },
  ];

  const getStatusChip = (status) => {
    switch (status) {
      case "Completed":
        return (
          <Chip
            icon={<CheckCircleIcon fontSize="small" />}
            label={status}
            color="success"
            size="small"
            variant="outlined"
          />
        );
      case "Pending":
        return (
          <Chip
            icon={<PendingIcon fontSize="small" />}
            label={status}
            color="warning"
            size="small"
            variant="outlined"
          />
        );
      case "Failed":
        return (
          <Chip
            icon={<ErrorIcon fontSize="small" />}
            label={status}
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
      case "PayPal":
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
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              )}
              <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Method</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              {!isMobile && (
                <>
                  <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Details</TableCell>
                </>
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
                  <TableCell>
                    {new Date(payment.date).toLocaleDateString()}
                  </TableCell>
                )}
                <TableCell>
                  <Typography fontWeight="bold">
                    ${payment.amount.toFixed(2)}
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
                  <>
                    <TableCell>{payment.type}</TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {payment.card}
                      </Typography>
                    </TableCell>
                  </>
                )}
                <TableCell>
                  <Tooltip title="View receipt">
                    <IconButton size="small" color="primary">
                      <ReceiptIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Mobile view alternative */}
      {isMobile && (
        <Box sx={{ mt: 2 }}>
          {payments.map((payment) => (
            <Paper key={payment.id} sx={{ p: 2, mb: 2 }} elevation={2}>
              <Box display="flex" justifyContent="space-between">
                <Typography fontWeight="bold">{payment.id}</Typography>
                <Typography color="text.secondary">
                  {new Date(payment.date).toLocaleDateString()}
                </Typography>
              </Box>
              <Box mt={1} display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="body2">{payment.type}</Typography>
                  <Box display="flex" alignItems="center" mt={0.5}>
                    {getMethodIcon(payment.method)}
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {payment.card}
                    </Typography>
                  </Box>
                </Box>
                <Box textAlign="right">
                  <Typography fontWeight="bold">
                    ${payment.amount.toFixed(2)}
                  </Typography>
                  {getStatusChip(payment.status)}
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PaymentHistoryTable;
