"use client";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { FitnessCenter } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  return (
    <AppBar
      position="absolute"
      sx={{ backgroundColor: "transparent", boxShadow: "none", zIndex: 2 }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
        <Box
          onClick={() => navigate("/")}
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <FitnessCenter sx={{ color: "#FFD700", fontSize: 32 }} />
        </Box>

        {!isMobile && (
          <Box sx={{ display: "flex", gap: 4 }}>
            {["PROGRAM", "TRAINER", "PROMO", "ABOUT"].map((item) => (
              <Typography
                key={item}
                variant="body1"
                sx={{
                  color: "white",
                  cursor: "pointer",
                  fontWeight: 500,
                  "&:hover": { color: "#FFD700" },
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        )}

        <Button
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            px: 3,
            "&:hover": {
              borderColor: "#FFD700",
              color: "#FFD700",
            },
          }}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}
