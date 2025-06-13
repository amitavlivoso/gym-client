"use client";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import Hero from "../../components/Member/Hero";
// import Pricing from "../../components/Member/Pricing";

import StatsCard from "../../components/Member/StatCard";
import Service from "../../components/Member/Service";

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
      <Box>
        <Box />
        <Box />
        <Hero onNext={handleNext} onPrev={handlePrev} />
      </Box>

      {/* Rest of your components */}
      <Box component="main">
        {/* <Pricing /> */}
        <StatsCard />
        <Service />
      </Box>
    </>
  );
}
