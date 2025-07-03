import React from "react";

import gymvdo from "../../assets/image/gym.mp4";

import PricingSection from "../../components/Member/Pricing";
import { useNavigate } from "react-router-dom";

import MemberShipBenifits from "./MemberShipBenifits";
import ClassesSection from "./Classes";
import About from "./About";
import WhyChooseUs from "./WhyChooseUs";
import Trainer from "./Trainer";
import TestimonialsCarousel from "./Testimonial";
import BlogSection from "./Blog";

const GymMembership = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-[100%]     ">
      {/* Hero Section */}

      <div className="relative text-center h-[130vh] flex justify-center items-center z-10 mt-[-40px] flex-col overflow-hidden">
        {/* 🔹 Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={gymvdo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* 🔹 Black Overlay */}
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

        {/* 🔹 Content */}
        <div className="relative z-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
            Gym For Your Fitness
          </h1>

          <p className="text-lg md:text-xl text-white mb-8">
            Stream Hundreds Of Expertly Led Yoga & Meditation Classes On Any
            Device.
          </p>

          <button
            onClick={() => navigate("/join")}
            className="bg-[#FF6F59] hover:bg-[#FF6F59] text-gray-900 font-bold py-2 px-8 rounded shadow-lg transform transition hover:scale-105 duration-300 mb-8"
          >
            Join Us
          </button>
        </div>
      </div>

      {/* MemberShip Benifits */}
      <MemberShipBenifits />

      {/* Classes Section */}

      <ClassesSection />

      {/* about section  */}
      <About />
      {/* Teachers Section */}

      <Trainer />

      {/* why you chose us section      */}

      <WhyChooseUs />
      {/* priceing plan section  */}

      <PricingSection />

      {/* Testimonial */}
      <TestimonialsCarousel />

      {/* Blog section */}
      <BlogSection />
    </div>
  );
};

export default GymMembership;
