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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteUser, editUser, getAllUser } from "../../../services/Service";
import { toast } from "react-toastify";

const AssignTrainer = () => {
  const navigate = useNavigate();
  const { role } = useParams();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [membershipFilter, setMembershipFilter] = useState("All");
  const [members, setMembers] = useState([]);

  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedAssignMember, setSelectedAssignMember] = useState(null);
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [trainerList, setTrainerList] = useState([]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const res = await getAllUser({
          data: { filter: "", role: "Member" },
          page: 0,
          pageSize: 50,
          order: [["createdAt", "ASC"]],
        });
        setMembers(res?.data?.data?.rows || []);
      } catch (err) {
        console.error(err);
      }
    };

    const loadTrainers = async () => {
      try {
        const res = await getAllUser({
          data: { filter: "", role: "Trainer" },
          page: 0,
          pageSize: 50,
          order: [["createdAt", "ASC"]],
        });
        setTrainerList(res?.data?.data?.rows || []);
      } catch (err) {
        console.error(err);
      }
    };

    loadMembers();
    loadTrainers();
  }, []);

  const handleAddMember = () => {
    navigate(`/${role}/dashboard/add-member`);
  };

  const handleDelete = (id) => {
    deleteUser(id)
      .then(() => {
        setMembers((prev) => prev.filter((member) => member.id !== id));
        toast.success("Member Deleted Successfully");
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
        toast.error("Failed to delete member.");
      });
  };

  const handleAssignTrainer = async () => {
    if (!selectedTrainer) {
      toast.error("Please select a trainer.");
      return;
    }

    try {
      await editUser(selectedAssignMember.id, { trainerId: selectedTrainer });
      toast.success("Trainer assigned successfully!");

      // Optionally update local state
      setMembers((prev) =>
        prev.map((member) =>
          member.id === selectedAssignMember.id
            ? { ...member, trainerId: selectedTrainer }
            : member
        )
      );

      setAssignDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to assign trainer.");
    }
  };

  const filteredMembers = members.filter((member) => {
    const name = member.firstName + member.lastName;
    const matchesSearch =
      name.toLowerCase().includes(searchText.toLowerCase()) ||
      member.email.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || member.status === statusFilter;
    const matchesMembership =
      membershipFilter === "All" || member.membership === membershipFilter;
    return matchesSearch && matchesStatus && matchesMembership;
  });

  const rowsWithFullName = filteredMembers.map((member) => ({
    ...member,
    name: `${member.firstName} ${member.lastName}`,
  }));

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      hide: isMobile,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      minWidth: 180,
    },
    {
      field: "joinDate",
      headerName: "Join Date",
      minWidth: 130,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 110,
      renderCell: (params) => (
        <Box
          sx={{
            fontWeight: 600,
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            color:
              params.value === "ACTIVE"
                ? theme.palette.success.main
                : params.value === "PENDING"
                ? theme.palette.warning.main
                : theme.palette.error.main,
            backgroundColor:
              params.value === "ACTIVE"
                ? "rgba(76, 175, 80, 0.1)"
                : params.value === "Pending"
                ? "rgba(255, 193, 7, 0.1)"
                : "rgba(244, 67, 54, 0.1)",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "assignTrainer",
      headerName: "Trainer",
      minWidth: 150,
      renderCell: (params) => {
        const trainerId = params.row.trainerId;
        const trainer = trainerList.find((t) => t.id === trainerId);

        if (trainer) {
          return (
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {trainer.firstName} {trainer.lastName}
            </Typography>
          );
        }

        return (
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={() => {
              setSelectedAssignMember(params.row);
              setSelectedTrainer("");
              setAssignDialogOpen(true);
            }}
          >
            Assign
          </Button>
        );
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      minWidth: isMobile ? 120 : 150,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="View">
            <IconButton
              size="small"
              color="info"
              onClick={() =>
                navigate(`/${role}/dashboard/member/${params.row.id}`, {
                  state: {
                    name: params.row.name,
                    email: params.row.email,
                  },
                })
              }
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit">
            <IconButton
              size="small"
              color="primary"
              onClick={() =>
                navigate(`/${role}/dashboard/add-member`, {
                  state: { id: params.row.id },
                })
              }
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => {
                setMemberToDelete(params.row);
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
      {/* Header and Add Button */}
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
          Member Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddMember}
          fullWidth={isMobile}
          size={isMobile ? "small" : "medium"}
          sx={{ backgroundColor: color.firstColor }}
        >
          Add Member
        </Button>
      </Box>

      {/* Search and Filter */}
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

        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: isMobile ? "100%" : "auto",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
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
        </Box>
      </Paper>

      {/* Table */}
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

      {/* Assign Trainer Dialog */}
      <Dialog
        open={assignDialogOpen}
        onClose={() => setAssignDialogOpen(false)}
        fullWidth
      >
        <DialogTitle>Assign Trainer</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography>
            Assign a trainer to <strong>{selectedAssignMember?.name}</strong>
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel>Trainer</InputLabel>
            <Select
              label="Trainer"
              value={selectedTrainer}
              onChange={(e) => setSelectedTrainer(e.target.value)}
            >
              {trainerList.map((trainer) => (
                <MenuItem key={trainer.id} value={trainer.id}>
                  {trainer.firstName} {trainer.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssignDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAssignTrainer}>
            Assign
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>
              {memberToDelete?.firstName} {memberToDelete?.lastName}
            </strong>
            ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete(memberToDelete?.id);
              setDeleteDialogOpen(false);
            }}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AssignTrainer;
