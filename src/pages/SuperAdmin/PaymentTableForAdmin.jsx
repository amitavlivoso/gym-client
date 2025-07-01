import {
  Box,
  Typography,
  Paper,
  Button,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deletePaymentAdmin,
  deletePaymentSuperAdmin,
  getAllPaymentForAdmin,
} from "../../services/Service";
import { toast } from "react-toastify";
import color from "../../components/shared/Color";

const PaymentTableForAdmin = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const payLoad = {
    data: { filter: "" },
    page: 0,
    pageSize: 50,
    order: [["createdAt", "ASC"]],
  };

  useEffect(() => {
    setLoading(true);
    getAllPaymentForAdmin(payLoad)
      .then((res) => {
        setPayments(res?.data?.data?.rows || []);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAddPayment = () => {
    navigate(`/admin/dashboard/payment-create-for-admin`);
  };

  const handleEdit = (id) => {
    navigate(`/admin/dashboard/payment-create-for-admin/`, {
      state: { id: id },
    });
  };

  const handleDelete = (id) => {
    // Replace with your real delete function for payment
    deletePaymentSuperAdmin(id)
      .then((res) => {
        console.log(res);
        setPayments((prev) => prev.filter((p) => p.id !== id));
        toast.success("Payment Plan Deleted Successfully!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete payment plan.");
      });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "price", headerName: "Price (₹)", flex: 0.5, minWidth: 100 },
    {
      field: "period",
      headerName: "Period (Months)",
      flex: 0.5,
      minWidth: 120,
    },
    {
      field: "popular",
      headerName: "Popular",
      flex: 0.5,
      minWidth: 100,
      renderCell: (params) =>
        params.value ? (
          <Typography color={theme.palette.success.main}>Yes</Typography>
        ) : (
          <Typography color={theme.palette.grey[500]}>No</Typography>
        ),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      minWidth: 200,
    },
    {
      field: "features",
      headerName: "Features",
      flex: 1.5,
      minWidth: 200,
      renderCell: (params) =>
        Array.isArray(params.value)
          ? params.value.join(", ")
          : String(params.value || ""),
    },

    {
      field: "actions",
      headerName: "Actions",
      minWidth: 120,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleEdit(params.row.id)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ px: isMobile ? 1 : 3, py: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "stretch" : "center",
          mb: 2,
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Payment Plans Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddPayment}
          fullWidth={isMobile}
          size={isMobile ? "small" : "medium"}
          sx={{ backgroundColor: color.firstColor }}
        >
          Add Payment Plan
        </Button>
      </Box>

      {/* Table */}
      <Paper elevation={3} sx={{ borderRadius: 3, p: 2 }}>
        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            loading={loading}
            rows={payments}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
            disableSelectionOnClick
            density={isMobile ? "compact" : "standard"}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.grey[100],
                fontWeight: 600,
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default PaymentTableForAdmin;
