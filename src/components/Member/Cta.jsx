"use client";
import { Box, Button, Container, Typography } from "@mui/material";

export default function CallToActionBanner() {
  return (
    <Box
      sx={{
        backgroundColor: "#FFD700",
        py: 8,
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: "#000" }}>
          Start Your Fitness Journey Today!
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#000",
            color: "#FFD700",
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            "&:hover": { backgroundColor: "#333" },
          }}
        >
          Book a Free Tour
        </Button>
      </Container>
    </Box>
  );
}
