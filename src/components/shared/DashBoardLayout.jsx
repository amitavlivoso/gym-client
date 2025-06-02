"use client";
import { Box, AppBar, Toolbar, Typography, Container } from "@mui/material";
import color from "./Color";

export default function DashboardLayout({ title, children }) {
  return (
    <Box sx={{ minHeight: "100vh", color: "#fff" }}>
      <AppBar
        position="static"
        sx={{ bgcolor: color.firstColor, color: "#000" }}
      >
        <Toolbar>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 4, width: "100vw" }}>{children}</Container>
    </Box>
  );
}
