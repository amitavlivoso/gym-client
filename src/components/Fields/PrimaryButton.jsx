"use client";
import { Button } from "@mui/material";

export default function PrimaryButton({
  children,
  onClick,
  fullWidth = true,
  ...props
}) {
  return (
    <Button
      variant="contained"
      fullWidth={fullWidth}
      onClick={onClick}
      sx={{
        backgroundColor: "#FFD700",
        color: "#000",
        fontWeight: "bold",
        mt: 2,
        "&:hover": {
          backgroundColor: "#FFC107",
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
