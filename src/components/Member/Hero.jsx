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
          alignItems: "flex-start",
          textAlign: "left",
          px: { xs: 2, sm: 4, md: 6, lg: 8 }, // More padding on left
        }}
      >
        <Box
          sx={{
            mb: 4,
            maxWidth: "800px",
            // Additional left margin
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              lineHeight: 1,
              mb: 2,
            }}
          >
            <Box
              component="span"
              sx={{
                color: "transparent",
                WebkitTextStroke: "2px white",
                display: "block",
                fontSize: "3rem", // Largest
              }}
            >
              FITNESS
            </Box>
            <Box
              component="span"
              sx={{
                color: "white",
                display: "block",
                fontSize: {
                  xs: "2.5rem",
                  sm: "3.5rem",
                  md: "4rem",
                  lg: "4.5rem",
                }, // Medium
              }}
            >
              AND BODY
            </Box>
            <Box
              component="span"
              sx={{
                color: "transparent",
                WebkitTextStroke: "2px white",
                display: "block",
                fontSize: { xs: "2rem", sm: "3rem", md: "3.5rem", lg: "4rem" },
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
            py: 1.5, // Slightly less padding
            fontSize: "1.1rem", // Slightly smaller
            fontWeight: "bold",
            borderRadius: 0,
            ml: { xs: 0, md: 4 }, // Align with text
            mt: 2, // Space from text
            "&:hover": {
              backgroundColor: "#FFC107",
              transform: "scale(1.02)", // Subtle hover effect
            },
            transition: "all 0.3s ease",
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
