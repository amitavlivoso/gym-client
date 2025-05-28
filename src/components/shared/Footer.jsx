"use client";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Stack,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  Facebook,
  Instagram,
  Twitter,
} from "@mui/icons-material";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#111", color: "#fff", pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: "#FFD700", mb: 2 }}>
              Contact Us
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2">
                <Phone sx={{ verticalAlign: "middle", mr: 1 }} />
                +91 98765 43210
              </Typography>
              <Typography variant="body2">
                <Email sx={{ verticalAlign: "middle", mr: 1 }} />
                support@gymfit.com
              </Typography>
              <Typography variant="body2">
                <LocationOn sx={{ verticalAlign: "middle", mr: 1 }} />
                123 Fitness Street, India
              </Typography>
            </Stack>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: "#FFD700", mb: 2 }}>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={2}>
              <IconButton
                sx={{ color: "#FFD700", "&:hover": { color: "#FFC107" } }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                sx={{ color: "#FFD700", "&:hover": { color: "#FFC107" } }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                sx={{ color: "#FFD700", "&:hover": { color: "#FFC107" } }}
              >
                <Twitter />
              </IconButton>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: "#FFD700", mb: 2 }}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ "&:hover": { color: "#FFD700" }, fontSize: "14px" }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ "&:hover": { color: "#FFD700" }, fontSize: "14px" }}
              >
                Terms & Conditions
              </Link>
            </Stack>
          </Grid>
        </Grid>

        {/* Divider and Copyright */}
        <Box
          sx={{
            borderTop: "1px solid #333",
            mt: 6,
            pt: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "#888" }}>
            © {currentYear} GymFit. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
