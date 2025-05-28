// components/Fields/InputField.js
"use client";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export default function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  sx,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <TextField
      fullWidth
      label={label}
      variant="outlined"
      type={inputType}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      margin="normal"
      sx={sx}
      InputProps={{
        endAdornment: isPassword && (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              edge="end"
              sx={{ color: "#ccc" }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      error={Boolean(touched && error)}
      helperText={touched && error ? error : ""}
    />
  );
}
