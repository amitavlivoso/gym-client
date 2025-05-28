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
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const HRManagerTable = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [managers, setManagers] = useState([
    {
      id: 1,
      name: "John Doe",
      department: "Operations",
      status: "Active",
      hireDate: "2023-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      department: "Logistics",
      status: "On Leave",
      hireDate: "2022-09-10",
    },
  ]);

  const [manager, setManager] = useState({
    id: null,
    name: "",
    department: "",
    status: "Active",
    hireDate: "",
  });
  const [editMode, setEditMode] = useState(false);

  const handleSave = () => {
    if (editMode) {
      setManagers((prev) =>
        prev.map((m) => (m.id === manager.id ? { ...manager } : m))
      );
    } else {
      const newId = managers.length ? managers[managers.length - 1].id + 1 : 1;
      setManagers([...managers, { ...manager, id: newId }]);
    }
    setOpen(false);
    setManager({
      id: null,
      name: "",
      department: "",
      status: "Active",
      hireDate: "",
    });
    setEditMode(false);
  };

  const handleEdit = (row) => {
    setManager(row);
    setEditMode(true);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setManagers((prev) => prev.filter((m) => m.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "hireDate", headerName: "Hire Date", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
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
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(params.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: { xs: 1, md: 3 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Typography variant="h5">HrManager Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setManager({
              id: null,
              name: "",
              department: "",
              status: "Active",
              hireDate: "",
            });
            setEditMode(false);
            setOpen(true);
          }}
        >
          Hr Add Manager
        </Button>
      </Box>

      <Paper sx={{ p: 2 }}>
        <DataGrid
          rows={managers}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
          checkboxSelection
        />
      </Paper>

      {/* Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editMode ? "Edit Manager" : "Add Manager"}</DialogTitle>
        <DialogContent sx={{ minWidth: { xs: "auto", sm: 400 } }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <Avatar sx={{ width: 80, height: 80, alignSelf: "center" }} />
            <TextField
              label="Name"
              name="name"
              value={manager.name}
              onChange={(e) => setManager({ ...manager, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Department"
              name="department"
              value={manager.department}
              onChange={(e) =>
                setManager({ ...manager, department: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Hire Date"
              name="hireDate"
              type="date"
              value={manager.hireDate}
              InputLabelProps={{ shrink: true }}
              onChange={(e) =>
                setManager({ ...manager, hireDate: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Status"
              name="status"
              select
              value={manager.status}
              onChange={(e) =>
                setManager({ ...manager, status: e.target.value })
              }
              fullWidth
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="On Leave">On Leave</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HRManagerTable;
