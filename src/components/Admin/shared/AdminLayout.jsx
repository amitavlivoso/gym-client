import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline, Toolbar } from "@mui/material";
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

      {/* Header should come after Sidebar in the DOM */}
      <AdminSidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <AdminHeader
          drawerWidth={drawerWidth}
          handleDrawerToggle={handleDrawerToggle}
        />

        {/* Toolbar provides proper spacing below the AppBar */}
        <Toolbar />

        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: (theme) => theme.palette.background.default,
          }}
        >
          <Outlet />
        </Box>

        {/* Footer at the bottom */}
        {/* <Footer /> */}
      </Box>
    </Box>
  );
};

export default AdminLayout;
