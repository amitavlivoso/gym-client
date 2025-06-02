import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Box,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import color from "../../shared/Color";
import { getUserRoll, logout } from "../../../services/axiosClient";

const AdminHeader = ({ handleDrawerToggle, drawerWidth }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          noWrap
          component="div"
          color={color.firstColor}
          sx={{ flexGrow: 1, fontWeight: 600 }}
        >
          {getUserRoll()} Dashboard
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Account settings">
            <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: color.firstColor }}>
                <AccountCircle />
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 4,
              sx: {
                mt: 1.5,
                minWidth: 160,
                borderRadius: 2,
                boxShadow: theme.shadows[3],
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem onClick={() => logout()}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
