import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
  MenuItem,
  IconButton,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const MemberTable = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    joinDate: "",
    membership: "Basic",
  });

  const members = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      joinDate: "2023-01-15",
      membership: "Premium",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      joinDate: "2023-02-20",
      membership: "Basic",
      status: "Active",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      joinDate: "2023-03-10",
      membership: "Gold",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      joinDate: "2023-04-05",
      membership: "Premium",
      status: "Active",
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael@example.com",
      joinDate: "2023-05-12",
      membership: "Basic",
      status: "Pending",
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      hide: isMobile, // Hide on mobile
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      flex: isMobile ? 1 : undefined, // Make flexible on mobile
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      flex: isMobile ? 1 : undefined,
      hide: isMobile, // Hide on mobile
    },
    {
      field: "joinDate",
      headerName: "Join Date",
      width: 120,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "membership",
      headerName: "Membership",
      width: 120,
      hide: isMobile, // Hide on mobile
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Box
          sx={{
            color:
              params.value === "Active"
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
    {
      field: "actions",
      headerName: "Actions",
      width: isMobile ? 100 : 150,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Edit">
            <IconButton size="small" color="primary">
              <EditIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" color="error">
              <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const handleAddMember = () => {
    navigate("/admin-dashboard/add-member");
  };

  const handleSaveMember = () => {
    console.log("New member:", newMember);
    setOpenAddDialog(false);
    setNewMember({
      name: "",
      email: "",
      joinDate: "",
      membership: "Basic",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          mb: 2,
          gap: isMobile ? 2 : 0,
        }}
      >
        <Typography variant="h5" sx={{ mb: isMobile ? 1 : 0 }}>
          Member Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddMember}
          size={isMobile ? "small" : "medium"}
          fullWidth={isMobile}
        >
          Add Member
        </Button>
      </Box>

      <Paper sx={{ p: isMobile ? 1 : 2, overflow: "hidden" }}>
        <Box
          sx={{
            height: 500,
            width: "100%",
            "& .MuiDataGrid-cell": {
              padding: isMobile ? "4px" : "8px 16px",
            },
          }}
        >
          <DataGrid
            rows={members}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
            checkboxSelection
            disableSelectionOnClick
            density={isMobile ? "compact" : "standard"}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default MemberTable;
