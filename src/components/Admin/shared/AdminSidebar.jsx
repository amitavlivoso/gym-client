import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Toolbar,
  Box,
  Typography,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaymentIcon from "@mui/icons-material/Payment";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, useLocation, useParams } from "react-router-dom";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import color from "../../shared/Color";
import { getUserRoll } from "../../../services/axiosClient";

const settingsItems = [
  { text: "Settings", icon: <SettingsIcon />, to: "/admin/settings" },
];

const AdminSidebar = ({ drawerWidth, mobileOpen, handleDrawerToggle }) => {
  const { role } = useParams();

  const navItems =
    getUserRoll() === "Admin" || getUserRoll() === "Receptionist"
      ? [
          {
            text: "Dashboard",
            icon: <DashboardIcon />,
            to: `/${role}/dashboard`,
          },
          {
            text: "Payments",
            icon: <PaymentIcon />,
            to: "/admin/dashboard/payment",
          },
          {
            text: "Add Member",
            icon: <GroupAddIcon />,
            to: `/${role}/dashboard/add-member`,
          },
          {
            text: "Add Trainer",
            icon: <FitnessCenterIcon />,
            to: `/${role}/dashboard/add-trainer`,
          },
          {
            text: "Add Accountant",
            icon: <AccountBalanceIcon />,
            to: `/${role}/dashboard/add-accountant`,
          },
          {
            text: "Add HR Manager",
            icon: <SupervisorAccountIcon />,
            to: `/${role}/dashboard/add-hr`,
          },
          {
            text: "Add Lead",
            icon: <LeaderboardIcon />,
            to: `/${role}/dashboard/add-lead`,
          },
          {
            text: "Add Manager",
            icon: <ManageAccountsIcon />,
            to: `/${role}/dashboard/add-manager`,
          },
          {
            text: "Add Receptionist",
            icon: <RoomServiceIcon />,
            to: `/${role}/dashboard/add-receptionist`,
          },
        ]
      : [
          {
            text: "Dashboard",
            icon: <DashboardIcon />,
            to: `/${role}/dashboard`,
          },
          // { text: "Payments", icon: <PaymentIcon />, to: "/admin/payments" },
          ...(getUserRoll() === "Member"
            ? [
                {
                  text: "Payments",
                  icon: <PaymentIcon />,
                  to: "/member/dashboard/member-pay-history",
                },
              ]
            : [
                {
                  text: "Payments",
                  icon: <PaymentIcon />,
                  to: "/admin/payments",
                },
              ]),
          ...(getUserRoll() !== "Member"
            ? [
                {
                  text: "Add Member",
                  icon: <GroupAddIcon />,
                  to: `/${role}/dashboard/add-member`,
                },
              ]
            : []),
        ];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const drawerContent = (
    <Box>
      <Toolbar sx={{ justifyContent: "center", py: 2 }}>
        <Typography variant="h6" fontWeight="bold" color={color.firstColor}>
          {getUserRoll()} Panel
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map(({ text, icon, to }) => (
          <ListItemButton
            key={text}
            component={Link}
            to={to}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              transition: "all 0.2s ease-in-out",
              backgroundColor: isActive(to) ? color.firstColor : "transparent",
              color: isActive(to)
                ? theme.palette.primary.contrastText
                : theme.palette.text.primary,
              "&:hover": {
                backgroundColor: isActive(to)
                  ? color.firstColor
                  : theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 36,
                color: isActive(to)
                  ? theme.palette.primary.contrastText
                  : theme.palette.text.primary,
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={text}
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: isActive(to) ? 600 : 500,
              }}
            />
          </ListItemButton>
        ))}
      </List>
      <Divider sx={{ my: 1 }} />
      <List>
        {settingsItems.map(({ text, icon, to }) => (
          <ListItemButton
            key={text}
            component={Link}
            to={to}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              transition: "all 0.2s ease-in-out",
              backgroundColor: isActive(to)
                ? theme.palette.primary.light
                : "transparent",
              color: isActive(to)
                ? theme.palette.primary.contrastText
                : theme.palette.text.primary,
              "&:hover": {
                backgroundColor: isActive(to)
                  ? theme.palette.primary.main
                  : theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 36,
                color: isActive(to)
                  ? theme.palette.primary.contrastText
                  : theme.palette.text.primary,
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={text}
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: isActive(to) ? 600 : 500,
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="admin sidebar"
    >
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
            paddingTop: 1,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default AdminSidebar;
