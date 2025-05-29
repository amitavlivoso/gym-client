"use client";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import Hero from "../../components/Member/Hero";
import Pricing from "../../components/Member/Pricing";
import WhyChooseUs from "../../components/Member/WhyChooseUs";
import FeaturesOverview from "../../components/Member/Feature";
import Testimonials from "../../components/Member/Testimonial";
import CallToActionBanner from "../../components/Member/Cta";

const images = [
  "/assets/HeroImage1.png",
  "/assets/HeroImage2.png",
  "/assets/HeroImage3.png",
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

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
        component="section"
        sx={{
          height: "100vh",
          width: "100vw",
          position: "relative",
          overflow: "hidden",
          marginTop: 0, // Ensure no gap at the top
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${images[currentIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 1,
          }}
        />
        <Hero onNext={handleNext} onPrev={handlePrev} />
      </Box>

      {/* Rest of your components */}
      <Box component="main">
        <Pricing />
        <WhyChooseUs />
        <FeaturesOverview />
        <Testimonials />
        <CallToActionBanner />
      </Box>
    </>
  );
}
