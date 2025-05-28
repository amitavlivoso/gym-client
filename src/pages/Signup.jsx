"use client";
import { Box, Container, Typography, Paper, Divider } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import InputField from "../components/Fields/InputField";
import PrimaryButton from "../components/Fields/PrimaryButton";
import { Link } from "react-router-dom";
import { Register } from "../services/Service";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

export default function Signup() {
  return (
    <Box
      sx={{
        backgroundColor: "#000",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 5,
            backgroundColor: "#1a1a1a",
            borderRadius: 3,
            border: "1px solid #333",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#FFD700",
              mb: 3,
              textAlign: "center",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Create an Account
          </Typography>

          <Formik
            initialValues={{
              fullName: "",
              email: "",
              phone: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const nameParts = values.fullName.trim().split(" ");
              const firstName = nameParts[0];
              const lastName = nameParts.slice(1).join(" ");
              const payLoad = {
                firstName: firstName,
                lastName: lastName,
                role: "MEMBER",
                email: values.email,
                password: values.password,
                phoneNumber: values.phone,
              };
              console.log(payLoad);
              Register(payLoad).then((res) => {
                console.log(res);
              });
              console.log("Form Values:", values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <InputField
                  label="Full Name"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.fullName && errors.fullName)}
                  helperText={touched.fullName && errors.fullName}
                />

                <InputField
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />

                <InputField
                  label="Phone Number"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.phone && errors.phone)}
                  helperText={touched.phone && errors.phone}
                />

                <InputField
                  label="Password"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />

                <Box mt={3}>
                  <PrimaryButton type="submit" fullWidth>
                    Sign Up
                  </PrimaryButton>
                </Box>
              </form>
            )}
          </Formik>

          <Divider sx={{ my: 3, borderColor: "#444" }} />

          <Typography
            variant="body2"
            sx={{ textAlign: "center", color: "#ccc" }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#FFD700",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Login here
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
