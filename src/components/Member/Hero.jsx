"use client";
import { Box, Typography, Button, Container, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
const whatsappNumber = "919124538064";

export default function Hero({ onNext, onPrev }) {
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "3rem", md: "6rem", lg: "8rem" },
              fontWeight: 900,
              lineHeight: 0.9,
              mb: 2,
            }}
          >
            <Box
              component="span"
              sx={{
                color: "transparent",
                WebkitTextStroke: "2px white",
                display: "block",
              }}
            >
              FITNESS
            </Box>
            <Box component="span" sx={{ color: "white", display: "block" }}>
              AND BODY
            </Box>
            <Box
              component="span"
              sx={{
                color: "transparent",
                WebkitTextStroke: "2px white",
                display: "block",
              }}
            >
              BUILDER
            </Box>
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          href={`https://wa.me/${whatsappNumber}`}
          sx={{
            backgroundColor: "#FFD700",
            color: "black",
            px: 6,
            py: 2,
            fontSize: "1.2rem",
            fontWeight: "bold",
            borderRadius: 0,
            "&:hover": { backgroundColor: "#FFC107" },
          }}
        >
          JOIN NOW
        </Button>
      </Container>

      {/* Navigation Arrows */}
      <IconButton
        onClick={onPrev}
        sx={{
          position: "absolute",
          left: 20,
          top: "50%",
          transform: "translateY(-50%)",
          color: "white",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          zIndex: 2,
          "&:hover": {
            backgroundColor: "rgba(255, 215, 0, 0.2)",
          },
        }}
      >
        <ArrowBackIos />
      </IconButton>

      <IconButton
        onClick={onNext}
        sx={{
          position: "absolute",
          right: 20,
          top: "50%",
          transform: "translateY(-50%)",
          color: "white",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          zIndex: 2,
          "&:hover": {
            backgroundColor: "rgba(255, 215, 0, 0.2)",
          },
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </>
  );
}
