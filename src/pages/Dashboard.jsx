import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { getUserRoll } from "../services/axiosClient";
import AdminDashboard from "./Admin/AdminDashBoard";
import UserDashboard from "./Member/UserDashBoard";

const Dashboard = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchRole = async () => {
      const res = await getUserRoll(); // assuming this returns a Promise
      setRole(res); // example: "Admin", "Member", etc.
    };

    fetchRole();
  }, []);

  const renderDashboardContent = () => {
    switch (role) {
      case "Admin":
      case "Manager":
      case "HR":
      case "Accountant":
      case "Trainer":
        return <AdminDashboard />;
      case "Member":
        return <UserDashboard />;
      default:
        return <Typography>Loading or no dashboard available.</Typography>;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* <Typography variant="h4" gutterBottom>
          {role ? `${role} Dashboard` : "Loading..."}
        </Typography> */}
        {renderDashboardContent()}
      </Box>
    </Box>
  );
};

export default Dashboard;
