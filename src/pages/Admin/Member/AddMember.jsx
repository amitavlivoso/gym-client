import { Formik, Form } from "formik";
import {
  TextField,
  MenuItem,
  Paper,
  Typography,
  Button,
  Box,
  InputAdornment,
  Avatar,
  CircularProgress,
  useTheme,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  CalendarToday as CalendarTodayIcon,
} from "@mui/icons-material";
import { Register } from "../../../services/Service";
import { membervalidationSchema } from "../../../components/shared/Schema";
import { toast } from "react-toastify";

const roleOptions = [
  "Accountant",
  "Trainer",
  "HR Manager",
  "Manager",
  "Lead",
  "Receptionist",
  "Member",
];
const statusOptions = ["ACTIVE", "INACTIVE"];

const AddMember = () => {
  const theme = useTheme();

  const initialValues = {
    fullName: "",
    joinDate: "",
    role: "Member",
    status: "ACTIVE",
    email: "",
    phoneNumber: "",
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 900,
          margin: "20px auto",
          padding: { xs: 2, sm: 4 },
          borderRadius: 4,
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              width: 60,
              height: 60,
              margin: "0 auto 16px",
            }}
          >
            <PersonIcon fontSize="large" />
          </Avatar>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            fontWeight={700}
            color="primary"
          >
            Add New Member
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Fill in the details below to add a new team member
          </Typography>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={membervalidationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // Split fullName into firstName and lastName
            const [firstName, ...rest] = values.fullName.trim().split(" ");
            const lastName = rest.join(" ");

            const payLoad = {
              firstName,
              lastName,
              email: values.email,
              phoneNumber: values.phoneNumber,
              joinDate: values.joinDate,
              role: values.role,
              status: values.status,
              password: "123456",
            };

            Register(payLoad)
              .then((res) => {
                // console.log("Registered:", res);
                toast(res?.data?.msg);
                resetForm();
              })
              .catch((err) => {
                console.error("Registration Error:", err);
              })
              .finally(() => setSubmitting(false));
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            touched,
            errors,
            isSubmitting,
            isValid,
            dirty,
          }) => (
            <Form>
              {/* Full Name Field */}
              <Box sx={{ mb: 3 }}>
                <TextField
                  label="Full Name"
                  name="fullName"
                  fullWidth
                  variant="outlined"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.fullName && Boolean(errors.fullName)}
                  helperText={touched.fullName && errors.fullName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon
                          color={
                            touched.fullName
                              ? errors.fullName
                                ? "error"
                                : "primary"
                              : "action"
                          }
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                    },
                  }}
                />
              </Box>

              {/* Contact Fields */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 3,
                  mb: 3,
                }}
              >
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  type="email"
                  variant="outlined"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon
                          color={
                            touched.email
                              ? errors.email
                                ? "error"
                                : "primary"
                              : "action"
                          }
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                    },
                  }}
                />

                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  fullWidth
                  variant="outlined"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon
                          color={
                            touched.phoneNumber
                              ? errors.phoneNumber
                                ? "error"
                                : "primary"
                              : "action"
                          }
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                    },
                  }}
                />
              </Box>

              {/* Role, Status, Join Date */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 3,
                  mb: 3,
                }}
              >
                <TextField
                  select
                  fullWidth
                  label="Role"
                  name="role"
                  variant="outlined"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.role && Boolean(errors.role)}
                  helperText={touched.role && errors.role}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <WorkIcon
                          color={
                            touched.role
                              ? errors.role
                                ? "error"
                                : "primary"
                              : "action"
                          }
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                    },
                  }}
                >
                  {roleOptions.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  fullWidth
                  label="Status"
                  name="status"
                  variant="outlined"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.status && Boolean(errors.status)}
                  helperText={touched.status && errors.status}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                    },
                  }}
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      <Box display="flex" alignItems="center">
                        {status === "ACTIVE" ? (
                          <CheckCircleIcon
                            color="success"
                            sx={{ mr: 1, fontSize: 20 }}
                          />
                        ) : (
                          <ErrorIcon
                            color="error"
                            sx={{ mr: 1, fontSize: 20 }}
                          />
                        )}
                        {status}
                      </Box>
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Join Date"
                  name="joinDate"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={values.joinDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.joinDate && Boolean(errors.joinDate)}
                  helperText={touched.joinDate && errors.joinDate}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon
                          color={
                            touched.joinDate
                              ? errors.joinDate
                                ? "error"
                                : "primary"
                              : "action"
                          }
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                    },
                  }}
                />
              </Box>

              {/* Action Buttons */}
              <Box
                mt={5}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  sx={{
                    px: 4,
                    borderRadius: 3,
                    minWidth: 180,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                  disabled={isSubmitting || !isValid || !dirty}
                  sx={{
                    px: 4,
                    borderRadius: 3,
                    minWidth: 180,
                    textTransform: "none",
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                    "&:hover": {
                      boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
                    },
                  }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Create Member"
                  )}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default AddMember;
