// import React from "react";
// import {
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   useTheme,
//   useMediaQuery,
//   Toolbar,
//   Box,
//   Typography,
// } from "@mui/material";
// import GroupIcon from "@mui/icons-material/Group";
// import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PaymentIcon from "@mui/icons-material/Payment";
// import SettingsIcon from "@mui/icons-material/Settings";
// import { Link, useLocation, useParams } from "react-router-dom";
// import GroupAddIcon from "@mui/icons-material/GroupAdd";
// import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
// import LeaderboardIcon from "@mui/icons-material/Leaderboard";
// import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
// import RoomServiceIcon from "@mui/icons-material/RoomService";
// import color from "../../shared/Color";
// import { getUserRoll } from "../../../services/axiosClient";

// const settingsItems = [
//   { text: "Settings", icon: <SettingsIcon />, to: "/admin/settings" },
// ];

// const AdminSidebar = ({ drawerWidth, mobileOpen, handleDrawerToggle }) => {
//   const { role } = useParams();

//   const navItems =
//     getUserRoll() === "Admin" || getUserRoll() === "Receptionist"
//       ? [
//           {
//             text: "Dashboard",
//             icon: <DashboardIcon />,
//             to: `/${role}/dashboard`,
//           },
//           {
//             text: "Payments",
//             icon: <PaymentIcon />,
//             to: "/admin/dashboard/payment",
//           },
//           {
//             text: "Add Member",
//             icon: <GroupAddIcon />,
//             to: `/${role}/dashboard/add-member`,
//           },
//           {
//             text: "Add Trainer",
//             icon: <FitnessCenterIcon />,
//             to: `/${role}/dashboard/add-trainer`,
//           },
//           {
//             text: "Add Accountant",
//             icon: <AccountBalanceIcon />,
//             to: `/${role}/dashboard/add-accountant`,
//           },
//           {
//             text: "Add HR Manager",
//             icon: <SupervisorAccountIcon />,
//             to: `/${role}/dashboard/add-hr`,
//           },
//           {
//             text: "Add Lead",
//             icon: <LeaderboardIcon />,
//             to: `/${role}/dashboard/add-lead`,
//           },
//           {
//             text: "Add Manager",
//             icon: <ManageAccountsIcon />,
//             to: `/${role}/dashboard/add-manager`,
//           },
//           {
//             text: "Add Receptionist",
//             icon: <RoomServiceIcon />,
//             to: `/${role}/dashboard/add-receptionist`,
//           },
//         ]
//       : [
//           {
//             text: "Dashboard",
//             icon: <DashboardIcon />,
//             to: `/${role}/dashboard`,
//           },
//           // { text: "Payments", icon: <PaymentIcon />, to: "/admin/payments" },
//           ...(getUserRoll() === "Member"
//             ? [
//                 {
//                   text: "Payments",
//                   icon: <PaymentIcon />,
//                   to: "/member/dashboard/member-pay-history",
//                 },
//               ]
//             : [
//                 {
//                   text: "Payments",
//                   icon: <PaymentIcon />,
//                   to: "/admin/payments",
//                 },
//               ]),
//           ...(getUserRoll() !== "Member"
//             ? [
//                 {
//                   text: "Add Member",
//                   icon: <GroupAddIcon />,
//                   to: `/${role}/dashboard/add-member`,
//                 },
//               ]
//             : []),
//         ];
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const location = useLocation();

//   const isActive = (path) => {
//     return location.pathname === path;
//   };

//   const drawerContent = (
//     <Box>
//       <Toolbar sx={{ justifyContent: "center", py: 2 }}>
//         <Typography variant="h6" fontWeight="bold" color={color.firstColor}>
//           {getUserRoll()} Panel
//         </Typography>
//       </Toolbar>
//       <Divider />
//       <List>
//         {navItems.map(({ text, icon, to }) => (
//           <ListItemButton
//             key={text}
//             component={Link}
//             to={to}
//             sx={{
//               px: 3,
//               py: 1.5,
//               borderRadius: 2,
//               mx: 1,
//               my: 0.5,
//               transition: "all 0.2s ease-in-out",
//               backgroundColor: isActive(to) ? color.firstColor : "transparent",
//               color: isActive(to)
//                 ? theme.palette.primary.contrastText
//                 : theme.palette.text.primary,
//               "&:hover": {
//                 backgroundColor: isActive(to)
//                   ? color.firstColor
//                   : theme.palette.action.hover,
//               },
//             }}
//           >
//             <ListItemIcon
//               sx={{
//                 minWidth: 36,
//                 color: isActive(to)
//                   ? theme.palette.primary.contrastText
//                   : theme.palette.text.primary,
//               }}
//             >
//               {icon}
//             </ListItemIcon>
//             <ListItemText
//               primary={text}
//               primaryTypographyProps={{
//                 fontSize: 15,
//                 fontWeight: isActive(to) ? 600 : 500,
//               }}
//             />
//           </ListItemButton>
//         ))}
//       </List>
//       <Divider sx={{ my: 1 }} />
//       <List>
//         {settingsItems.map(({ text, icon, to }) => (
//           <ListItemButton
//             key={text}
//             component={Link}
//             to={to}
//             sx={{
//               px: 3,
//               py: 1.5,
//               borderRadius: 2,
//               mx: 1,
//               my: 0.5,
//               transition: "all 0.2s ease-in-out",
//               backgroundColor: isActive(to)
//                 ? theme.palette.primary.light
//                 : "transparent",
//               color: isActive(to)
//                 ? theme.palette.primary.contrastText
//                 : theme.palette.text.primary,
//               "&:hover": {
//                 backgroundColor: isActive(to)
//                   ? theme.palette.primary.main
//                   : theme.palette.action.hover,
//               },
//             }}
//           >
//             <ListItemIcon
//               sx={{
//                 minWidth: 36,
//                 color: isActive(to)
//                   ? theme.palette.primary.contrastText
//                   : theme.palette.text.primary,
//               }}
//             >
//               {icon}
//             </ListItemIcon>
//             <ListItemText
//               primary={text}
//               primaryTypographyProps={{
//                 fontSize: 15,
//                 fontWeight: isActive(to) ? 600 : 500,
//               }}
//             />
//           </ListItemButton>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <Box
//       component="nav"
//       sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//       aria-label="admin sidebar"
//     >
//       <Drawer
//         variant={isMobile ? "temporary" : "permanent"}
//         open={isMobile ? mobileOpen : true}
//         onClose={handleDrawerToggle}
//         ModalProps={{ keepMounted: true }}
//         sx={{
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             boxSizing: "border-box",
//             borderRight: `1px solid ${theme.palette.divider}`,
//             backgroundColor: theme.palette.background.paper,
//             paddingTop: 1,
//           },
//         }}
//       >
//         {drawerContent}
//       </Drawer>
//     </Box>
//   );
// };

// export default AdminSidebar;

import React from "react";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  DirectionsRun as RunIcon,
  FitnessCenter as FitnessCenterIcon,
  Restaurant as RestaurantIcon,
  CalendarToday as CalendarIcon,
  Payment as PaymentIcon,
  Groups as GroupsIcon,
  Settings as SettingsIcon,
  HelpOutline as HelpIcon,
  Phone as PhoneIcon,
  Class as ClassIcon,
  PersonAdd as PersonAddIcon,
  Receipt as ReceiptIcon,
  Equalizer as EqualizerIcon,
  Notifications as NotificationsIcon,
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon,
  AccountBalance as AccountBalanceIcon,
  SupervisorAccount as SupervisorAccountIcon,
  Leaderboard as LeaderboardIcon,
  ManageAccounts as ManageAccountsIcon,
  RoomService as RoomServiceIcon,
} from "@mui/icons-material";
import { Link, useLocation, useParams } from "react-router-dom";
import { getUserName, getUserRoll } from "../../../services/axiosClient";
import "../../assets/css/main.min.css";
import logo from "../../assets/images/livosologo.png";

const AdminSidebar = ({ drawerWidth, mobileOpen, handleDrawerToggle }) => {
  const { role } = useParams();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Get initials from user name
  const getInitials = () => {
    const name = getUserName() || "User";
    const parts = name.split(" ");
    let initials = parts[0].charAt(0).toUpperCase();
    if (parts.length > 1) {
      initials += parts[parts.length - 1].charAt(0).toUpperCase();
    }
    return initials;
  };

  const settingsItems = [
    { text: "Settings", icon: <SettingsIcon />, to: "/admin/settings" },
  ];

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
            icon: <PersonAddIcon />,
            to: `/${role}/dashboard/add-member`,
          },
          {
            text: "Add Trainer",
            icon: <RunIcon />,
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
          {
            text: "Members",
            icon: <PeopleIcon />,
            to: `/${role}/dashboard/member-table`,
          },
          {
            text: "Trainers",
            icon: <RunIcon />,
            to: `/${role}/dashboard/trainer-table`,
          },
          {
            text: "Workout Plans",
            icon: <FitnessCenterIcon />,
            to: `/${role}/workouts`,
          },
          {
            text: "Nutrition Plans",
            icon: <RestaurantIcon />,
            to: `/${role}/nutrition`,
          },
          {
            text: "Equipment",
            icon: <FitnessCenterIcon />,
            to: `/${role}/equipment`,
          },
          {
            text: "Reports",
            icon: <EqualizerIcon />,
            to: `/${role}/reports`,
          },
          {
            text: "Help & Support",
            icon: <HelpIcon />,
            to: `/${role}/help-support`,
          },
        ]
      : [
          {
            text: "Dashboard",
            icon: <DashboardIcon />,
            to: `/${role}/dashboard`,
          },
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
                  icon: <PersonAddIcon />,
                  to: `/${role}/dashboard/add-member`,
                },
                {
                  text: "Members",
                  icon: <PeopleIcon />,
                  to: `/${role}/members`,
                },
                {
                  text: "Trainers",
                  icon: <RunIcon />,
                  to: `/${role}/trainers`,
                },
                {
                  text: "Workout Plans",
                  icon: <FitnessCenterIcon />,
                  to: `/${role}/workouts`,
                },
              ]
            : []),
        ];

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <nav
        id="sidebar"
        className="sidebar-wrapper"
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <div className="brand-container d-flex align-items-center justify-content-between">
          <div className="app-brand ms-3">
            <Link to="/">
              <img src={logo} className="logo" alt="Gym Management System" />
            </Link>
          </div>

          <button
            type="button"
            className="pin-sidebar me-3"
            onClick={handleDrawerToggle}
            aria-label="Toggle sidebar"
          >
            <MenuIcon />
          </button>
        </div>

        <div className="sidebar-profile">
          <div
            className="initials-avatar rounded-circle border border-primary border-3 d-flex align-items-center justify-content-center"
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#0d6efd",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            {getInitials()}
          </div>
          <h6 className="mb-1 profile-name text-nowrap text-truncate text-primary">
            {getUserName()}
          </h6>
          <small className="profile-name text-nowrap text-truncate">
            {getUserRoll()}
          </small>
        </div>

        <div
          className="sidebarMenuScroll"
          style={{ flex: 1, overflowY: "auto" }}
        >
          <ul className="sidebar-menu">
            {navItems.map((item, index) => (
              <li
                key={index}
                className={`${isActive(item.to) ? "active current-page" : ""} ${
                  item.subItems ? "treeview" : ""
                }`}
              >
                <Link to={item.to || "#"}>
                  {item.icon &&
                    React.cloneElement(item.icon, { className: "me-2" })}
                  <span className="menu-text">{item.text}</span>
                  {item.subItems && (
                    <ChevronRightIcon className="treeview-indicator" />
                  )}
                </Link>
                {item.subItems && (
                  <ul className="treeview-menu">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={subItem.to}
                          className={isActive(subItem.to) ? "active" : ""}
                        >
                          {subItem.icon &&
                            React.cloneElement(subItem.icon, {
                              className: "me-2",
                            })}
                          <span className="menu-text">{subItem.text}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            {settingsItems.map((item, index) => (
              <li
                key={`settings-${index}`}
                className={isActive(item.to) ? "active" : ""}
              >
                <Link to={item.to}>
                  {item.icon &&
                    React.cloneElement(item.icon, { className: "me-2" })}
                  <span className="menu-text">{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar-contact d-flex align-items-start">
          <PhoneIcon className="me-2 mt-1" />
          <div>
            <p className="fw-light mb-1 text-nowrap text-truncate">
              Emergency Contact
            </p>
            <h5 className="m-0 lh-1 text-nowrap text-truncate">0987654321</h5>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
