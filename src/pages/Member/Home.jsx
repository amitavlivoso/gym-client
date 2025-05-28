"use client";
import { Box } from "@mui/material";
import { useState } from "react";
import Hero from "../../components/Member/Hero";
import Pricing from "../../components/Member/Pricing";
import WhyChooseUs from "../../components/Member/WhyChooseUs";
import FeaturesOverview from "../../components/Member/Feature";
import Testimonials from "../../components/Member/Testimonial";
import CallToActionBanner from "../../components/Member/Cta";

const images = ["/assets/body.jpg", "/assets/body1.jpg", "/assets/body2.jpg"]; // Add more images as needed

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 1,
          },
        }}
      >
        <Hero onNext={handleNext} onPrev={handlePrev} />
      </Box>
      <Box>
        <Pricing />
      </Box>
      <Box>
        <WhyChooseUs />
      </Box>
      <Box>
        <FeaturesOverview />
      </Box>
      <Box>
        <Testimonials />
      </Box>
      <Box>
        <CallToActionBanner />
      </Box>
    </>
  );
}
