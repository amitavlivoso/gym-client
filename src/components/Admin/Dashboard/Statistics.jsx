import React from "react";
import { Box, Typography, Tabs, Tab, Paper, useTheme } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DataGrid } from "@mui/x-data-grid";

const weeklyData = [
  { name: "Mon", paid: 12, pending: 8, failed: 2 },
  { name: "Tue", paid: 19, pending: 3, failed: 1 },
  { name: "Wed", paid: 15, pending: 5, failed: 0 },
  { name: "Thu", paid: 18, pending: 2, failed: 1 },
  { name: "Fri", paid: 10, pending: 10, failed: 3 },
  { name: "Sat", paid: 8, pending: 4, failed: 1 },
  { name: "Sun", paid: 5, pending: 2, failed: 0 },
];

const monthlyData = [
  { name: "Jan", paid: 120, pending: 30, failed: 10 },
  { name: "Feb", paid: 150, pending: 20, failed: 5 },
  { name: "Mar", paid: 180, pending: 25, failed: 8 },
  { name: "Apr", paid: 90, pending: 40, failed: 12 },
  { name: "May", paid: 200, pending: 15, failed: 5 },
  { name: "Jun", paid: 170, pending: 30, failed: 7 },
];

const paymentDetails = [
  { id: 1, user: "John Doe", amount: 100, status: "Paid", date: "2023-05-01" },
  {
    id: 2,
    user: "Jane Smith",
    amount: 150,
    status: "Pending",
    date: "2023-05-02",
  },
  {
    id: 3,
    user: "Robert Johnson",
    amount: 200,
    status: "Failed",
    date: "2023-05-03",
  },
  {
    id: 4,
    user: "Emily Davis",
    amount: 75,
    status: "Paid",
    date: "2023-05-04",
  },
  {
    id: 5,
    user: "Michael Brown",
    amount: 120,
    status: "Paid",
    date: "2023-05-05",
  },
];

const PaymentStatus = () => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "user", headerName: "User", width: 150 },
    { field: "amount", headerName: "Amount", width: 100 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Box
          sx={{
            color:
              params.value === "Paid"
                ? theme.palette.success.main
                : params.value === "Pending"
                ? theme.palette.warning.main
                : theme.palette.error.main,
            fontWeight: "bold",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    { field: "date", headerName: "Date", width: 120 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Payment Status
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Tabs value={value} onChange={handleChange} aria-label="payment tabs">
          <Tab label="Weekly" />
          <Tab label="Monthly" />
          <Tab label="Details" />
        </Tabs>

        {value === 0 && (
          <Box sx={{ height: 400, mt: 2 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="paid" fill={theme.palette.success.main} />
                <Bar dataKey="pending" fill={theme.palette.warning.main} />
                <Bar dataKey="failed" fill={theme.palette.error.main} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}

        {value === 1 && (
          <Box sx={{ height: 400, mt: 2 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="paid" fill={theme.palette.success.main} />
                <Bar dataKey="pending" fill={theme.palette.warning.main} />
                <Bar dataKey="failed" fill={theme.palette.error.main} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}

        {value === 2 && (
          <Box sx={{ height: 400, width: "100%", mt: 2 }}>
            <DataGrid
              rows={paymentDetails}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default PaymentStatus;
