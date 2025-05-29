import color from "../../shared/Color";
import {
  Box,
  Typography,
  Paper,
  Button,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllUser, deleteUser } from "../../../services/Service";
import { toast } from "react-toastify";

const LeadTable = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [membershipFilter, setMembershipFilter] = useState("All");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [trainerToDelete, setTrainerToDelete] = useState(null);

  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const payLoad = {
      data: { filter: "", role: "Lead" },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "ASC"]],
    };

    getAllUser(payLoad)
      .then((res) => {
        setTrainers(res?.data?.data?.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddTrainer = () => {
    navigate("/admin-dashboard/add-member");
  };

  const handleConfirmDelete = (id) => {
    deleteUser(id)
      .then(() => {
        setTrainers((prev) => prev.filter((t) => t.id !== trainerToDelete.id));
        setDeleteDialogOpen(false);
        toast("Member Deleted Successfully");
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
      });
  };

  const filteredTrainers = trainers.filter((trainer) => {
    const name = trainer.firstName + trainer.lastName;
    const matchesSearch =
      name.toLowerCase().includes(searchText.toLowerCase()) ||
      trainer.email.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || trainer.status === statusFilter;

    const matchesMembership =
      membershipFilter === "All" || trainer.membership === membershipFilter;

    return matchesSearch && matchesStatus && matchesMembership;
  });

  const rowsWithFullName = filteredTrainers.map((member) => ({
    ...member,
    name: `${member.firstName} ${member.lastName}`,
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 70, hide: isMobile },
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      minWidth: 180,
      hide: isMobile,
    },
    {
      field: "joinDate",
      headerName: "Join Date",
      minWidth: 130,
      // valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 110,
      renderCell: (params) => (
        <Box
          sx={{
            fontWeight: 600,
            color:
              params.value === "ACTIVATE"
                ? theme.palette.success.main
                : params.value === "PENDING"
                ? theme.palette.warning.main
                : theme.palette.error.main,
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: isMobile ? 100 : 140,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Edit">
            <IconButton size="small" color="primary">
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => {
                setTrainerToDelete(params.row);
                setDeleteDialogOpen(true);
              }}
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
          Lead Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddTrainer}
          fullWidth={isMobile}
          size={isMobile ? "small" : "medium"}
          sx={{ backgroundColor: color.firstColor }}
        >
          Add Lead
        </Button>
      </Box>

      {/* Search and Filter Bar */}
      <Paper
        elevation={1}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          alignItems: isMobile ? "stretch" : "center",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name or email..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          size="small"
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="All">All Status</MenuItem>
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="INACTIVE">Inactive</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Membership</InputLabel>
          <Select
            value={membershipFilter}
            onChange={(e) => setMembershipFilter(e.target.value)}
            label="Membership"
          >
            <MenuItem value="All">All Types</MenuItem>
            <MenuItem value="Basic">Basic</MenuItem>
            <MenuItem value="Premium">Premium</MenuItem>
            <MenuItem value="Gold">Gold</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      <Paper elevation={3} sx={{ borderRadius: 3, p: 2 }}>
        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rowsWithFullName}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
            checkboxSelection
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete{" "}
          <strong>{trainerToDelete?.name}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            color="error"
            onClick={handleConfirmDelete}
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LeadTable;
