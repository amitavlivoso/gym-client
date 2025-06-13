import React from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Paper,
  Typography,
  Avatar,
  InputAdornment,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Person,
  Email,
  Phone,
  Wc,
  LocationOn,
  Event,
  Contacts,
} from "@mui/icons-material";
import { Register } from "../../services/Service";
import { toast } from "react-toastify";

const genderOptions = ["Male", "Female", "Other"];

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.string().required("Date of birth is required"),
  address: Yup.string().required("Address is required"),
  emergencyContact: Yup.string().required("Emergency contact is required"),
});

const JoinUsForm = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dob: "",
    address: "",
    emergencyContact: "",
    password: "123456", // default or generate
    role: "Member",
    joinDate: new Date().toISOString().split("T")[0],
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await Register(values);
      toast.success(res?.data?.msg || "You have joined successfully!");
      resetForm();
    } catch (err) {
      toast.error("Failed to submit. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5, px: 2 }}>
      <Paper elevation={4} sx={{ maxWidth: 600, width: "100%", p: 4 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Avatar sx={{ bgcolor: "primary.main", mx: "auto", mb: 1 }}>
            <Person />
          </Avatar>
          <Typography variant="h5" fontWeight={600}>
            Join Our Gym
          </Typography>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form>
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Box>

              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                sx={{ mb: 2 }}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                sx={{ mb: 2 }}
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  select
                  label="Gender"
                  name="gender"
                  fullWidth
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.gender && Boolean(errors.gender)}
                  helperText={touched.gender && errors.gender}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Wc />
                      </InputAdornment>
                    ),
                  }}
                >
                  {genderOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={values.dob}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.dob && Boolean(errors.dob)}
                  helperText={touched.dob && errors.dob}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Event />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <TextField
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={2}
                sx={{ mb: 2 }}
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Emergency Contact"
                name="emergencyContact"
                sx={{ mb: 2 }}
                value={values.emergencyContact}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.emergencyContact && Boolean(errors.emergencyContact)
                }
                helperText={touched.emergencyContact && errors.emergencyContact}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Contacts />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
              >
                Join Now
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default JoinUsForm;
