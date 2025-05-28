"use client";
import {
  Box,
  Container,
  Typography,
  Grid,
  Avatar,
  Rating,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";

const testimonials = [
  {
    name: "Ravi Sharma",
    rating: 5,
    feedback:
      "I've lost 10kg and feel stronger than ever. Amazing trainers and support!",
    avatar: "/assets/avatar1.jpg",
  },
  {
    name: "Priya Mehta",
    rating: 4,
    feedback:
      "Love the 24/7 access and personalized workout plans. Highly recommended!",
    avatar: "/assets/avatar2.jpg",
  },
  {
    name: "Amit Patel",
    rating: 5,
    feedback:
      "Biometric check-ins are smooth, and WhatsApp updates keep me on track.",
    avatar: "/assets/avatar3.jpg",
  },
];

export default function Testimonials() {
  return (
    <Box
      sx={{
        py: 10,
        backgroundColor: "#000",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 6,
            color: "#FFD700",
            textTransform: "uppercase",
          }}
        >
          Member Testimonials
        </Typography>
        <Grid container spacing={6}>
          {testimonials.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  backgroundColor: "#1a1a1a",
                  border: "2px solid #FFD700",
                  borderRadius: 3,
                  boxShadow: "0px 4px 20px rgba(255, 215, 0, 0.1)",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0px 6px 30px rgba(255, 215, 0, 0.2)",
                  },
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      alt={item.name}
                      src={item.avatar}
                      sx={{ width: 56, height: 56 }}
                    />
                  }
                  title={
                    <Typography variant="h6" sx={{ color: "#FFD700" }}>
                      {item.name}
                    </Typography>
                  }
                  subheader={
                    <Rating
                      value={item.rating}
                      readOnly
                      sx={{ color: "#FFD700" }}
                    />
                  }
                  sx={{
                    borderBottom: "1px solid #333",
                    mb: 2,
                    px: 3,
                    pt: 3,
                    pb: 0,
                  }}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    sx={{ color: "#ccc", lineHeight: 1.6 }}
                  >
                    {item.feedback}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
