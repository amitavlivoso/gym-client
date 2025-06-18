import { useState } from "react";

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
    <div className="bg-gray-50 py-16 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Testimonials
          </h2>

          <p className="text-gray-600 text-sm">what members are saying</p>
        </div>

        {/* Testimonial Card */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mx-auto max-w-3xl relative">
          <div className="flex items-center">
            {/* Profile Image */}

            <div className="mb-6">
              <img
                src={testimonials[currentIndex].image || "/placeholder.svg"}
                alt={testimonials[currentIndex].name}
                width={80}
                height={80}
                className="rounded-full object-cover h-[110px] w-[200px]"
              />
            </div>

            <div className="ps-4">
              {/* Testimonial Text */}

              <p className="text-gray-700 text-lg leading-relaxed mb-6 text-left">
                {testimonials[currentIndex].text}
              </p>

              {/* Rating */}

              <div className="flex items-center gap-1 mb-1 justify-start">
                {renderStars(testimonials[currentIndex].rating)}
              </div>

              {/* Name */}

              <h3 className="text-gray-900 font-semibold text-lg flex justify-start ">
                {testimonials[currentIndex].name}
              </h3>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
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
