"use client";
import {
  Box,
  Container,
  Typography,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";
import InputField from "../components/Fields/InputField";
import PrimaryButton from "../components/Fields/PrimaryButton";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Signin } from "../services/Service";
import { setCurrentAccessToken } from "../services/axiosClient";
import { loginValidation } from "../components/shared/Schema";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <Box
      sx={{
        backgroundColor: "#000",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={4}
          sx={{
            p: 5,
            borderRadius: 3,
            border: "1px solid #FFD700",
            backgroundColor: "#111",
            color: "#fff",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "#FFD700", mb: 4, textAlign: "center" }}
          >
            Login to Your Account
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginValidation}
            onSubmit={(values) => {
              const payLoad = {
                email: values.email,
                password: values.password,
              };
              Signin(payLoad)
                .then((res) => {
                  const accessToken = res?.data?.data?.accessToken;
                  const role = res?.data?.data?.role?.toLowerCase(); // Convert to lowercase

                  setCurrentAccessToken(accessToken);

                  // Redirect based on lowercase role
                  if (role) {
                    window.location.href = `/${role}/dashboard`;
                  } else {
                    // fallback if role not present
                    console.error("Role is missing in response");
                  }
                })
                .catch((err) => {
                  console.error(err);
                });
            }}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <InputField
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  sx={{
                    input: { color: "#fff" },
                    label: { color: "#ccc" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#444",
                      },
                      "&:hover fieldset": {
                        borderColor: "#FFD700",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#FFD700",
                      },
                    },
                  }}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <InputField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  sx-={{
                    input: { color: "#fff" },
                    label: { color: "#ccc" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#444",
                      },
                      "&:hover fieldset": {
                        borderColor: "#FFD700",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#FFD700",
                      },
                    },
                  }}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                          sx={{ color: "#FFD700" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box sx={{ mt: 3 }}>
                  <PrimaryButton type="submit">Login</PrimaryButton>
                </Box>
              </Form>
            )}
          </Formik>

          <Typography
            variant="body2"
            sx={{ mt: 3, color: "#aaa", textAlign: "center" }}
          >
            Not registered?{" "}
            <Link
              to="/register"
              style={{
                color: "#FFD700",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Create an account
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
