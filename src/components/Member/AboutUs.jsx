import React from "react";
import { Box, Typography, Paper, Grid, Avatar } from "@mui/material";
import {
  FaDumbbell,
  FaHandsHelping,
  FaFingerprint,
  FaRegUser,
  FaUsers,
  FaSwimmer,
  FaRegSadCry,
} from "react-icons/fa";
import { GiWaterSplash, GiMuscleUp } from "react-icons/gi";

import "./about.css";
import about2 from "../../assets/image/about2.jpg";

const AboutUs = () => {
  return (
    <div>
      <div className="abouthero relative">
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center">
          <div className="relative z-20 flex justify-center items-center flex-col">
            {/* Add your content inside here */}
            <h2 className="text-white z-30 text-xl md:text-7xl font-extrabold">
              {" "}
              About Us
            </h2>
            <p className="text-gray-300 z-10 text-lg md:text-xl max-w-2xl text-center mt-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam
              in quo culpa voluptate ?
            </p>
          </div>
        </div>
      </div>

      {/* OUR STORY */}
      <section className="story container">
        <h2 className="section-title">
          <span className="highlight-red">OUR STORY</span>
        </h2>
        <p>
          In 1993, the first Fitness First club opened in Bournemouth in the
          South Of England. Over the next decade and a half, Fitness First was
          present in over 16 countries, including India making it a leader in
          the global fitness industry. In 2018, Fitness First India was acquired
          by cure. Fit, India’s largest chain of fitness Centres that offers
          energetic group workouts and multiple workout formats to choose from.
        </p>
        <div style={{ textAlign: "center" }}>
          <span style={{ display: "inline" }}>
            For more details of Fitness First clubs
          </span>
          <a href="#" style={{ display: "inline" }}>
            click here
          </a>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="container">
        <h2 className="section-title">What’s Inside?</h2>
        <p className="subtitle">
          A 30-Day Guided Journey to Healing & Nervous System Regulation
        </p>

        <div className="cards-grid">
          <div className="card-about">
            <Avatar
              sx={{
                bgcolor: "#FF6347",
                width: 60,
                height: 60,
                margin: "0 auto 16px",
              }}
            >
              <FaDumbbell size="2em" />
            </Avatar>
            <h5>Somatic Exercises</h5>
            <p>
              Gently release tension stored in the lower back, hips, gut, and
              jaw
            </p>
          </div>

          <div className="card-about">
            <Avatar
              sx={{
                bgcolor: "#FF6347",
                width: 60,
                height: 60,
                margin: "0 auto 16px",
              }}
            >
              <FaHandsHelping size="2em" />
            </Avatar>
            <h5>Issue-Specific Healing</h5>
            <p>
              Regulate high cortisol, improve sleep, balance hormones, and fight
              fatigue
            </p>
          </div>

          <div className="card-about">
            <Avatar
              sx={{
                bgcolor: "#FF6347",
                width: 60,
                height: 60,
                margin: "0 auto 16px",
              }}
            >
              <FaSwimmer size="2em" />
            </Avatar>
            <h5>Soothing Self-Touch Techniques</h5>
            <p>
              Ease discomfort and tension in the neck, face, jaw, shoulders, and
              full body
            </p>
          </div>

          <div className="card-about">
            <Avatar
              sx={{
                bgcolor: "#FF6347",
                width: 60,
                height: 60,
                margin: "0 auto 16px",
              }}
            >
              <FaFingerprint size="2em" />
            </Avatar>
            <h5>EFT Tapping</h5>
            <p>
              Break through emotional barriers and shift nervous system patterns
            </p>
          </div>

          <div className="card-about">
            <Avatar
              sx={{
                bgcolor: "#FF6347",
                width: 60,
                height: 60,
                margin: "0 auto 16px",
              }}
            >
              <GiMuscleUp size="2em" />
            </Avatar>
            <h5>Gentle Somatic Sculpting</h5>
            <p>
              Strengthen and restore connection through mindful, trauma-informed
              movement
            </p>
          </div>

          <div className="card-about">
            <Avatar
              sx={{
                bgcolor: "#FF6347",
                width: 60,
                height: 60,
                margin: "0 auto 16px",
              }}
            >
              <GiWaterSplash size="2em" />
            </Avatar>
            <h5>Restorative Breathwork</h5>
            <p>Invite your body back into a state of calm and safety</p>
          </div>

          <div className="card-about">
            <Avatar
              sx={{
                bgcolor: "#FF6347",
                width: 60,
                height: 60,
                margin: "0 auto 16px",
              }}
            >
              <FaRegSadCry size="2em" />
            </Avatar>
            <h5>Soma Support Hub</h5>
            <p>
              Gain access to symptom trackers, journal prompts, and healing
              guides
            </p>
          </div>

          <div className="card-about">
            <Avatar
              sx={{
                bgcolor: "#FF6347",
                width: 60,
                height: 60,
                margin: "0 auto 16px",
              }}
            >
              <FaUsers size="2em" />
            </Avatar>
            <h5>Welcoming Community</h5>
            <p>
              Share your journey with others in our safe, like-minded community
            </p>
          </div>

          <div className="card-about">
            <Avatar
              sx={{
                bgcolor: "#FF6347",
                width: 60,
                height: 60,
                margin: "0 auto 16px",
              }}
            >
              <FaRegUser size="2em" />
            </Avatar>
            <h5>Direct Access to Natalie</h5>
            <p>
              Get personalized support and guidance from the founder of Reset
            </p>
          </div>
        </div>
      </section>

      {/* OUR PHILOSOPHY */}
      <section className="story container">
        <h2 className="section-title">
          <span className="highlight-red">OUR PHILOSOPHY</span>
        </h2>
        <p>
          To offer the best equipment, range of classes, knowledgeable staff,
          and personal advice in a welcoming environment.
        </p>
      </section>

      {/* WHY FIT GYM */}
      <section
        className="story container"
        style={{ backgroundColor: "antiquewhite" }}
      >
        <h2 className="section-title">
          <span className="highlight-red">WHY FIT GYM</span>
        </h2>
        <p>
          From our industrial birthplace in Stevenage, Rise Gym has grown to
          become Hertfordshire’s premier fitness community. With
          state-of-the-art equipment and contemporary classes in an inclusive
          atmosphere, Rise is like no other gym outside of London.
        </p>
      </section>

      {/* HOW CAN WE HELP & WORK WITH US */}
      <section className="info-section">
        <div className="info-box help-box">
          <h3>HOW CAN WE HELP ?</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="info-box work-box">
          <h3>WORK WITH US</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </section>

      {/* Yoga Image Section */}
      <section className="image-section">
        <img src={about2} alt="Yoga Pose" />
      </section>
    </div>
  );
};

export default AboutUs;
