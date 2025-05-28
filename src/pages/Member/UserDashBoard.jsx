// pages/UserDashboard.jsx
"use client";
import DashboardLayout from "../../components/shared/DashBoardLayout";
import { Typography, Card, CardContent, Grid } from "@mui/material";

export default function UserDashboard() {
  return (
    <DashboardLayout title="User Dashboard">
      <Typography variant="h5" gutterBottom>
        Welcome to Your Gym Account
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "#121212", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6">Attendance</Typography>
              <Typography>You've attended 12 sessions this month.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "#121212", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6">Membership Status</Typography>
              <Typography>Active until July 15, 2025</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
