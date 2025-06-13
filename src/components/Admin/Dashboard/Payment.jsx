import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
} from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import PendingIcon from "@mui/icons-material/Pending";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { getAllPayment, getUser } from "../../../services/Service";

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const payload = {
        data: { filter: "" },
        page: 0,
        pageSize: 50,
        order: [["createdAt", "DESC"]],
      };
      try {
        const res = await getAllPayment(payload);
        const paymentRows = res?.data?.data?.rows || [];

        const paymentsWithNames = await Promise.all(
          paymentRows.map(async (payment) => {
            try {
              const userRes = await getUser(payment.userId);
              const user = userRes?.data?.data;
              const fullName = `${user?.firstName || ""} ${
                user?.lastName || ""
              }`.trim();
              return {
                ...payment,
                name: fullName,
              };
            } catch (err) {
              return { ...payment, name: "Unknown User" };
            }
          })
        );

        setPayments(paymentsWithNames);
      } catch (err) {
        console.error("Failed to fetch payments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Payment Records
      </Typography>

      {loading ? (
        <Box textAlign="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Plan</strong>
                </TableCell>
                <TableCell>
                  <strong>Amount (₹)</strong>
                </TableCell>
                <TableCell>
                  <strong>Date</strong>
                </TableCell>
                <TableCell>
                  <strong>Payment Method</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.name}</TableCell>
                  <TableCell>{payment.planName}</TableCell>
                  <TableCell>₹{Number(payment.amount).toFixed(2)}</TableCell>
                  <TableCell>{payment.paidAt}</TableCell>
                  <TableCell>
                    <Chip
                      icon={<CreditCardIcon />}
                      label={payment.method || "-"}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    {payment.status === "PAID" ? (
                      <Chip icon={<PaidIcon />} label="Paid" color="success" />
                    ) : (
                      <Chip
                        icon={<PendingIcon />}
                        label={payment.status || "Pending"}
                        color="warning"
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default PaymentPage;
