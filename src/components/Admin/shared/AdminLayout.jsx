import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Footer from "../../shared/Footer";

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <AdminHeader
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <AdminSidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginTop: "64px", // Adjust based on your header height
        }}
      >
        <Outlet />
      </Box>

      {/* If you want footer at the bottom */}
    </Box>
  );
};

export default AdminLayout;
