import { useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import Teacher1 from "../../assets/image/teacher1.jpg";
import Teacher2 from "../../assets/image/teacher2.jpg";

const testimonials = [
  {
    id: 1,
    name: "John Daven",
    text: "Excellent Yoga classes of all levels. Many teachers are amazing. I love Bernie Clark. I have many of my therapy patients join Yoga International.",
    rating: 4,
    image: Teacher1,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    text: "The variety of classes and instructors is incredible. I've been practicing for years and still discover new techniques and approaches here.",
    rating: 5,
    image: Teacher2,
  },
  {
    id: 3,
    name: "Mike Chen",
    text: "As a beginner, I was nervous about starting yoga. The supportive community and excellent instruction made all the difference.",
    rating: 5,
    image: Teacher2,
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    text: "The online platform is user-friendly and the quality of instruction is top-notch. Highly recommend for practitioners of all levels.",
    rating: 4,
    image: Teacher2,
  },
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Auto-rotate carousel every 3 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? "fill-orange-400 text-orange-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  return (
    <div className="bg-gray-50 py-12 md:py-16 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Testimonials
          </h2>
          <p className="text-gray-600 text-sm">What our members are saying</p>
        </div>

        {/* Testimonial Card */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8 mx-auto max-w-3xl relative">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            {/* Profile Image - Made rounded on mobile */}
            <div className="mb-4 md:mb-0 md:mt-6">
              <img
                src={testimonials[currentIndex].image || "/placeholder.svg"}
                alt={testimonials[currentIndex].name}
                className="rounded-full object-cover aspect-square w-20 md:w-[110px]"
              />
            </div>

            <div className="md:ps-6 text-center md:text-left">
              {/* Testimonial Text */}
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                {testimonials[currentIndex].text}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-1 justify-center md:justify-center">
                {renderStars(testimonials[currentIndex].rating)}
              </div>

              {/* Name */}
              <h3 className="text-gray-900 font-semibold text-lg">
                {testimonials[currentIndex].name}
              </h3>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6 md:mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-colors duration-200 ${
                index === currentIndex
                  ? "bg-orange-400"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
