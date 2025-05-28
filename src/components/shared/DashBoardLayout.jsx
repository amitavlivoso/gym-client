// components/Layout/DashboardLayout.jsx
"use client";
import { Box, AppBar, Toolbar, Typography, Container } from "@mui/material";

export default function DashboardLayout({ title, children }) {
  return (
    <Box sx={{ bgcolor: "#000", minHeight: "100vh", color: "#fff" }}>
      <AppBar position="static" sx={{ bgcolor: "#FFD700", color: "#000" }}>
        <Toolbar>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 4 }}>{children}</Container>
    </Box>
  );
}
