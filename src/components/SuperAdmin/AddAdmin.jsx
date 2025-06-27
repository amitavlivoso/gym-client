import { Formik, Form, useFormikContext } from "formik";
import { useState, useEffect } from "react";
import {
  TextField,
  Paper,
  Typography,
  Button,
  Box,
  InputAdornment,
  Avatar,
  CircularProgress,
  MenuItem
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";
import {
  Register,
  getUser,
  editUser,
} from "../../services/Service";
import { membervalidationSchema } from "../shared/Schema";
import { toast } from "react-toastify";
import color from "../shared/Color";
import { useLocation, useNavigate } from "react-router-dom";

const statusOptions = ["ACTIVE", "INACTIVE"];

const AddAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location?.state?.id;
  const isEdit = Boolean(userId);

  const [formState, setFormState] = useState({
    fullName: "",
    joinDate: "",
    status: "ACTIVE",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (isEdit) {
      getUser(userId).then((res) => {
        const data = res?.data?.data;
        if (data) {
          setFormState({
            fullName: `${data.firstName} ${data.lastName}`,
            joinDate: data.joinDate?.split("T")[0] || "",
            status: data.status,
            email: data.email,
            phoneNumber: data.phoneNumber,
          });
        }
      });
    }
  }, [isEdit, userId]);

  const initialValues = {
    fullName: formState.fullName,
    joinDate: formState.joinDate,
    status: formState.status,
    email: formState.email,
    phoneNumber: formState.phoneNumber,
  };

  return (
    <Box
      sx={{
        minHeight: "30vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        mb: 3,
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
              bgcolor: color.firstColor,
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
            color={color.firstColor}
          >
            {isEdit ? "Edit Admin" : "Add New Admin"}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {isEdit
              ? "Update the details below to edit the admin"
              : "Fill in the details below to add a new admin"}
          </Typography>
        </Box>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={membervalidationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const [firstName, ...rest] = values.fullName.trim().split(" ");
            const lastName = rest.join(" ");

            const payload = {
              firstName,
              lastName,
              email: values.email,
              phoneNumber: values.phoneNumber,
              joinDate: values.joinDate,
              role: "Admin",  
              status: values.status,
              password: "123456",
            };

            try {
              const res = isEdit
                ? await editUser(userId, payload)
                : await Register(payload);

              toast.success(
                res?.data?.msg ||
                  (isEdit ? "Admin Updated Successfully" : "Admin Created Successfully")
              );

              resetForm();
              navigate(-1);
            } catch (err) {
              console.error("Error:", err);
              toast.error("Something went wrong. Please try again.");
            } finally {
              setSubmitting(false);
            }
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
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

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
                  type="email"
                  fullWidth
                  variant="outlined"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
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
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

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
                  label="Status"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
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
                />
              </Box>

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
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                  disabled={isSubmitting || !isValid || !dirty}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : isEdit ? (
                    "Update Admin"
                  ) : (
                    "Create Admin"
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

export default AddAdmin;
