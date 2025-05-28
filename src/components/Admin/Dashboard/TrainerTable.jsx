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
  MenuItem,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";

const TrainerTable = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newTrainer, setNewTrainer] = useState({
    name: "",
    email: "",
    specialization: "Fitness",
    hireDate: "",
    status: "Active",
  });

  const trainers = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      specialization: "Yoga",
      hireDate: "2022-05-10",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Williams",
      email: "sarah@example.com",
      specialization: "Pilates",
      hireDate: "2022-07-15",
      status: "Active",
    },
    {
      id: 3,
      name: "Mike Brown",
      email: "mike@example.com",
      specialization: "CrossFit",
      hireDate: "2022-09-20",
      status: "On Leave",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      specialization: "Zumba",
      hireDate: "2023-01-05",
      status: "Active",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david@example.com",
      specialization: "Fitness",
      hireDate: "2023-03-12",
      status: "Inactive",
    },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 130 },
    { field: "email", headerName: "Email", flex: 1.5, minWidth: 180 },
    { field: "specialization", headerName: "Specialization", flex: 1 },
    { field: "hireDate", headerName: "Hire Date", width: 120 },
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
                : params.value === "On Leave"
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
      flex: 1,
      minWidth: 160,
      renderCell: () => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button size="small" variant="outlined">
            Edit
          </Button>
          <Button size="small" color="error" variant="outlined">
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const handleAddTrainer = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => setOpenAddDialog(false);

  const handleSaveTrainer = () => {
    console.log("New trainer:", newTrainer);
    handleCloseAddDialog();
    setNewTrainer({
      name: "",
      email: "",
      specialization: "Fitness",
      hireDate: "",
      status: "Active",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrainer((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 2,
          gap: 2,
        }}
      >
        <Typography variant="h5">Trainer Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddTrainer}
        >
          Add Trainer
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 2, overflow: "hidden" }}>
        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={trainers}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </Paper>

      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} fullWidth>
        <DialogTitle>Add New Trainer</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              pt: 1,
              pb: 1,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Avatar sx={{ width: 80, height: 80 }} />
            </Box>
            <TextField
              name="name"
              label="Full Name"
              value={newTrainer.name}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              value={newTrainer.email}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="specialization"
              label="Specialization"
              select
              value={newTrainer.specialization}
              onChange={handleInputChange}
              fullWidth
            >
              {[
                "Fitness",
                "Yoga",
                "Pilates",
                "CrossFit",
                "Zumba",
                "Martial Arts",
              ].map((spec) => (
                <MenuItem key={spec} value={spec}>
                  {spec}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="hireDate"
              label="Hire Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={newTrainer.hireDate}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="status"
              label="Status"
              select
              value={newTrainer.status}
              onChange={handleInputChange}
              fullWidth
            >
              {["Active", "On Leave", "Inactive"].map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleSaveTrainer} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TrainerTable;
