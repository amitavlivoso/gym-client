import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import color from "./Color";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navItems = [
    { label: "Home", path: "#home" },
    { label: "About Us", path: "#about" },
    { label: "Gallery", path: "#gallery" },
    { label: "Category", path: "#category" },
    { label: "Contact Us", path: "#contact" },
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ bgcolor: "background.paper" }}
    >
      <Toolbar
        sx={{
          maxWidth: "lg",
          mx: "60px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          px: { xs: 2, sm: 3 },
        }}
      >
        {/* Logo */}
        <Typography
          variant="h6"
          component="a"
          href="#"
          sx={{
            color: color.firstColor,
            fontWeight: "bold",
            textDecoration: "none",
            fontSize: { xs: "1.25rem", md: "1.5rem" },
          }}
        >
          LOGO
        </Typography>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                href={item.path}
                sx={{
                  color: color.blackColor,
                  "&:hover": {
                    color: color.firstColor,
                    bgcolor: "transparent",
                  },
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              variant="contained"
              href="#join"
              sx={{
                bgcolor: color.buttonColor,
                color: "joinButton.contrastText",
                "&:hover": {
                  bgcolor: "joinButton.hover",
                },
                textTransform: "none",
                fontSize: "1rem",
                width: "150px",
                borderRadius: "10px",
                ml: "150px",
              }}
            >
              Join Us
            </Button>
          </Box>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              aria-controls="mobile-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              sx={{ color: "navItem.main" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="mobile-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              MenuListProps={{
                "aria-labelledby": "mobile-menu",
              }}
              PaperProps={{
                sx: {
                  minWidth: 180,
                },
              }}
            >
              {navItems.map((item) => (
                <MenuItem
                  key={item.label}
                  onClick={handleMenuClose}
                  component="a"
                  href={item.path}
                  sx={{
                    color: "navItem.main",
                    "&:hover": {
                      color: "navItem.hover",
                    },
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
              <MenuItem
                onClick={handleMenuClose}
                component="a"
                href="#join"
                sx={{
                  color: "joinButton.contrastText",
                  bgcolor: "joinButton.main",
                  "&:hover": {
                    bgcolor: "joinButton.hover",
                  },
                }}
              >
                Join Us
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
