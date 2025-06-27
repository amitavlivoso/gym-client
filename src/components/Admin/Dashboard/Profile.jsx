import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  MenuItem,
  Card,
  Divider,
  Avatar,
  Chip,
  Paper,
  Stack
} from "@mui/material";
import { getProfile, editProfile } from "../../../services/Service";
import { toast } from "react-toastify";
import color from "../../shared/Color";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import CakeIcon from '@mui/icons-material/Cake';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';
import EmergencyIcon from '@mui/icons-material/MedicalServices';

export default function Profile() {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    status: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dob: "",
    joinDate: "",
    address: "",
    isVerified: false,
    emergencyContact: "",
  });

  const [originalData, setOriginalData] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const isMobile = useMediaQuery("(max-width:700px)");

  useEffect(() => {
    getProfile()
      .then((res) => {
        setProfileData(res?.data?.data);
        setOriginalData(res?.data?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleEdit = () => {
    if (isEditable) {
      editProfile(profileData)
        .then((res) => {
          toast.success(res?.data?.msg);
          setIsEditable(false);
          setOriginalData(profileData);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to update profile");
        });
    } else {
      setIsEditable(true);
    }
  };

  const handleCancel = () => {
    setProfileData(originalData);
    setIsEditable(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ACTIVE": return "success";
      case "INACTIVE": return "error";
      default: return "primary";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "ADMIN": return "error";
      case "MANAGER": return "warning";
      case "TRAINER": return "info";
      default: return "primary";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        py: 8,
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Card
          elevation={4}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          {/* Profile Header */}
          <Box
            sx={{
              background: `linear-gradient(45deg, ${color.primary} 0%, ${color.secondary} 100%)`,
              py: 4,
              px: 4,
              color: "white",
              position: "relative",
            }}
          >
            <Box display="flex" alignItems="center" gap={3} flexWrap="wrap">
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  fontSize: 32,
                  bgcolor: "rgba(255,255,255,0.2)",
                }}
              >
                {profileData.firstName.charAt(0)}
                {profileData.lastName.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {profileData.firstName} {profileData.lastName}
                </Typography>
                <Box display="flex" gap={2} mt={1} flexWrap="wrap">
                  <Chip
                    label={profileData.role}
                    color={getRoleColor(profileData.role)}
                    size="medium"
                    sx={{ 
                      color: "white",
                      fontWeight: 600,
                      px: 1
                    }}
                  />
                  <Chip
                    label={profileData.status}
                    color={getStatusColor(profileData.status)}
                    size="medium"
                    sx={{ 
                      color: "white",
                      fontWeight: 600,
                      px: 1
                    }}
                  />
                  {profileData.isVerified && (
                    <Chip
                      label="Verified"
                      color="success"
                      size="medium"
                      sx={{ 
                        color: "white",
                        fontWeight: 600,
                        px: 1
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Profile Content */}
          <Box sx={{ p: 4 }}>
            <Grid container spacing={3}>
              {/* Personal Information Section */}
              <Grid item xs={12}>
                <Typography variant="h6" fontWeight="bold" mb={2} sx={{ 
                  color: color.primary,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <PersonIcon fontSize="small" /> Personal Information
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ProfileField
                  label="First Name"
                  name="firstName"
                  value={profileData.firstName}
                  editable={isEditable}
                  handleChange={handleChange}
                  icon={<PersonIcon />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ProfileField
                  label="Last Name"
                  name="lastName"
                  value={profileData.lastName}
                  editable={isEditable}
                  handleChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ProfileField
                  label="Gender"
                  name="gender"
                  value={profileData.gender}
                  editable={isEditable}
                  handleChange={handleChange}
                  select
                  options={["Male", "Female", "Other"]}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                {isEditable ? (
                  <ProfileField
                    label="Date of Birth"
                    name="dob"
                    value={profileData.dob || ""}
                    editable={isEditable}
                    handleChange={handleChange}
                    type="date"
                    icon={<CakeIcon />}
                  />
                ) : (
                  <InfoCard
                    label="Date of Birth"
                    value={formatDate(profileData.dob)}
                    icon={<CakeIcon color="primary" />}
                  />
                )}
              </Grid>

              {/* Contact Information Section */}
              <Grid item xs={12} mt={2}>
                <Typography variant="h6" fontWeight="bold" mb={2} sx={{ 
                  color: color.primary,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <EmailIcon fontSize="small" /> Contact Information
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ProfileField
                  label="Email"
                  name="email"
                  value={profileData.email}
                  editable={isEditable}
                  handleChange={handleChange}
                  type="email"
                  icon={<EmailIcon />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ProfileField
                  label="Phone Number"
                  name="phoneNumber"
                  value={profileData.phoneNumber}
                  editable={isEditable}
                  handleChange={handleChange}
                  type="tel"
                  icon={<PhoneIcon />}
                />
              </Grid>

              <Grid item xs={12}>
                <ProfileField
                  label="Address"
                  name="address"
                  value={profileData.address}
                  editable={isEditable}
                  handleChange={handleChange}
                  multiline
                  rows={3}
                  icon={<HomeIcon />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ProfileField
                  label="Emergency Contact"
                  name="emergencyContact"
                  value={profileData.emergencyContact}
                  editable={isEditable}
                  handleChange={handleChange}
                  type="tel"
                  icon={<EmergencyIcon />}
                />
              </Grid>

              {/* Employment Information Section */}
              <Grid item xs={12} mt={2}>
                <Typography variant="h6" fontWeight="bold" mb={2} sx={{ 
                  color: color.primary,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <WorkIcon fontSize="small" /> Employment Information
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InfoCard
                  label="Role"
                  value={profileData.role}
                  icon={<WorkIcon color="primary" />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InfoCard
                  label="Status"
                  value={profileData.status}
                  icon={<WorkIcon color="primary" />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InfoCard
                  label="Join Date"
                  value={formatDate(profileData.joinDate)}
                  icon={<EventIcon color="primary" />}
                />
              </Grid>

              {/* Action Buttons */}
              <Grid item xs={12} mt={4} display="flex" justifyContent="flex-end" gap={2}>
                {isEditable ? (
                  <>
                    <Button
                      variant="outlined"
                      startIcon={<CancelIcon />}
                      onClick={handleCancel}
                      sx={{
                        color: color.error,
                        borderColor: color.error,
                        "&:hover": {
                          borderColor: color.error,
                          backgroundColor: "rgba(244, 67, 54, 0.04)",
                        },
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                        fontWeight: 600
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={toggleEdit}
                      sx={{
                        bgcolor: color.success,
                        "&:hover": {
                          bgcolor: color.successDark,
                        },
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                        fontWeight: 600
                      }}
                    >
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={toggleEdit}
                    sx={{
                      bgcolor: color.primary,
                      "&:hover": {
                        bgcolor: color.primaryDark,
                      },
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      fontWeight: 600
                    }}
                  >
                    Edit Profile
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}

function ProfileField({
  label,
  name,
  value,
  editable,
  handleChange,
  select = false,
  options = [],
  type = "text",
  multiline = false,
  rows = 1,
  icon
}) {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={handleChange}
      variant="outlined"
      fullWidth
      disabled={!editable}
      select={select}
      type={type}
      size="small"
      multiline={multiline}
      rows={rows}
      InputProps={{
        startAdornment: icon ? (
          <Box sx={{ mr: 1, color: 'action.active' }}>
            {React.cloneElement(icon, { fontSize: 'small' })}
          </Box>
        ) : null,
        sx: {
          borderRadius: 2,
          backgroundColor: editable ? "background.paper" : "action.disabledBackground",
        },
      }}
      InputLabelProps={{
        shrink: true,
      }}
    >
      {select &&
        options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
    </TextField>
  );
}

function InfoCard({ label, value, icon }) {
  return (
    <Paper elevation={0} sx={{ 
      p: 2,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'divider',
      backgroundColor: 'background.paper'
    }}>
      <Stack direction="row" alignItems="center" spacing={1.5}>
        {icon && React.cloneElement(icon, { fontSize: 'small' })}
        <Box>
          <Typography variant="subtitle2" color="textSecondary">
            {label}
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            {value}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}