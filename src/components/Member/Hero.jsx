"use client";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

import Header from "../../assets/image/header.png";
import Hero3 from "../../assets/image/hero.png";
import Hero1 from "../../assets/image/hero1.png";
import Hero2 from "../../assets/image/hero2.png";

import headerrunlogo from "../../assets/image/headerrunlogo.png";

export default function Hero() {
  const slides = [
    {
      title: "Transform your body and mind with our fitness program",

      subtitle:
        "Join our community of people motivated for a healthy lifestyle",

      btn1: "FitLifestyle",

      btn2: "EmpowerYourHealth",

      btn3: "Join Us",
      image: Header,
    },

    {
      title: "Achieve Your Goals With Us",

      subtitle: "Personalized plans for every fitness journey",

      btn1: "GoalSetter",

      btn2: "StayMotivated",

      btn3: "Start Now",
      image: Hero3
    },

    {
      title: "Wellness & Strength",

      subtitle: "Balance your mind and body with expert guidance",

      btn1: "WellnessFirst",

      btn2: "StrengthWithin",

      btn3: "Explore",
      image: Hero1
    },

    {
      title: "Join The Movement",

      subtitle: "Be part of a supportive fitness family",

      btn1: "Community",

      btn2: "MoveTogether",

      btn3: "Sign Up",
      image: Hero2
    },
  ];

  const settings = {
    dots: true,

    infinite: true,

    speed: 500,

    slidesToShow: 1,

    slidesToScroll: 1,

    autoplay: true,

    autoplaySpeed: 3000,

    arrows: false,
  };

  return (
    <Slider {...settings}>
      {slides.map((slide, idx) => (
        <div key={idx}>
          <div
            className="min-h-[120vh] py-8 max-w-[100vw] overflow-hidden flex"
            style={{
              backgroundImage:  `url(${slide.image})`,

              backgroundSize: "cover",

              backgroundPosition: "center",
            }}
          >
            {/* Main Content Container */}

            <div className="h-screen w-1/2 flex flex-col items-center justify-center">
              {/* Left Content */}

              <div className="w-full text-right">
                <button className="bg-white/20 backdrop-blur-sm border-b-2 border-pink-500 text-white px-8 py-2 rounded-tl-2xl rounded-tr-2xl text-sm font-medium">
                  {slide.btn1}
                </button>
              </div>

              <div className="mx-2 md:mx-4 mt-8">
                <h1 className="text-white text-4xl lg:text-5xl font-bold leading-tight mb-6">
                  {slide.title}
                </h1>

                <p className="text-white/90 text-lg mb-8 leading-relaxed">
                  {slide.subtitle}
                </p>

                <button className="bg-white/20 hover:bg-pink-500 text-white px-12 py-1 rounded-full text-lg font-semibold transition-colors">
                  {slide.btn3}
                </button>

                <div className="w-full text-right mt-4">
                  <button className="mb-8 bg-white/20 backdrop-blur-sm border-b-2 border-pink-500 text-white px-8 py-2 rounded-tl-2xl rounded-tr-2xl text-sm font-medium">
                    {slide.btn2}
                  </button>
                </div>

                <div className="flex space-x-2">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>

                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>

                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="w-1/2 h-screen flex items-center justify-between flex-col"
              style={{
                backgroundImage: `url(${headerrunlogo})`,

                backgroundSize: "contain",

                backgroundPosition: "center",

                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="w-full text-right">
                <button className="bg-white/20 backdrop-blur-sm border-b-2 border-pink-500 text-white px-8 py-2 rounded-tl-2xl rounded-tr-2xl text-sm font-medium">
                  {slide.btn2}
                </button>
              </div>

              <div className="w-full text-right">
                <button className="bg-white/20 backdrop-blur-sm border-b-2 border-pink-500 text-white px-8 py-2 rounded-tl-2xl rounded-tr-2xl text-sm font-medium">
                  {slide.btn2}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}
