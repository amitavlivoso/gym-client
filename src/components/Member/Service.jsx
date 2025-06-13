import React from "react";

import Ellipse from "../../assets/image/Ellipse.png";

import servicebg from "../../assets/image/servicebg.png";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

import Frame15 from "../../assets/image/Frame15.png";

import Frame16 from "../../assets/image/Frame16.png";

import Frame19 from "../../assets/image/Frame19.png";

export default function Service() {
  return (
    <main className="min-h-screen  ">
      {/* Services Section */}

      <section className="relative bg-gradient-to-r from-[#FF2E9F] via-[#531537] to-pink-600 text-white">
        <div className="container mx-auto px-4 pr-8 md:py-8 ">
          {/* <div className="absolute top-4 right-4 md:top-8 md:right-8">

            <h3 className="text-sm md:text-base font-medium">Our Services</h3>

          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="order-2 md:order-1">
              <div className="relative h-64 md:h-[120vh] overflow-hidden rounded-bl-[100px] md:ml-[-20px] ml-0">
                <img
                  src={Ellipse}
                  alt="FitnesGGDs training"
                  className="object-cover w-3/5 h-full absolute inset-0 "
                />
              </div>
            </div>

            <div className="order-1 md:order-2 absolute top-0 left-0 right-0 bottom-0 md:ml-60 md:mt-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">SERVICES</h2>

              <ul className="space-y-1 text-sm md:text-base">
                <li>12-week Nutrition Program + Bible Study</li>

                <li>Personal Training & Fitness Coaching</li>

                <li>Group Workshops</li>

                <li>Spiritual Growth & Wellness Guidance</li>
              </ul>
            </div>

            <div className="order-1  md:order-2 absolute top-56 right-0 bottom-0  md:mt-14 w-full  ">
              <div className="min-w-5xl h-36 ">
                <Slider
                  dots={true}
                  infinite={true}
                  speed={500}
                  slidesToShow={4}
                  slidesToScroll={1}
                  autoplay={true}
                  autoplaySpeed={2500}
                  className="h-36 "
                >
                  <div className="px-2">
                    <img
                      src={Frame15}
                      alt="Slide 1"
                      className="w-full h-36 object-cover rounded "
                    />
                  </div>

                  <div className="px-2">
                    <img
                      src={Frame16}
                      alt="Slide 2"
                      className="w-full h-36 object-cover rounded"
                    />
                  </div>

                  <div className="px-2">
                    <img
                      src={Frame19}
                      alt="Slide 3"
                      className="w-full h-36 object-cover rounded"
                    />
                  </div>

                  <div className="px-2">
                    <img
                      src={Frame16}
                      alt="Slide 4"
                      className="w-full h-36 object-cover rounded"
                    />
                  </div>

                  <div className="px-2">
                    <img
                      src={Frame19}
                      alt="Slide 5"
                      className="w-full h-36 object-cover rounded"
                    />
                  </div>

                  {/* Add more slides as needed */}
                </Slider>
              </div>
            </div>

            <div className="order-1 md:order-2 absolute left-1/3 right-0 bottom-[70px]  md:mt-14 max-w-lg">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                OUR PROGRAMS
              </h2>

              <ul className="space-y-1 text-sm md:text-sm tracking-wide">
                <li>
                  Our program blends physical fitness with spiritual growth,
                  offering a 12-week Nutrition Program and Bible Study to
                  nourish both body and soul. With personalized training, group
                  workshops, and coaching, we help you achieve your fitness
                  goals while fostering a strong sense of community. Our
                  spiritual wellness guidance supports inner peace, faith, and a
                  balanced mindset for long-term well-being.
                </li>

                <button className="bg-pink-700 mt-4 rounded-3xl px-5 py-3">
                  Learn more
                </button>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Programs Section */}

      {/* <section className="bg-pink-500 text-white" >

        <div className="container mx-auto px-4 py-8 md:py-16">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="order-2 md:order-1">

              <div className="grid grid-cols-2 gap-2">

                <div className="rounded-lg overflow-hidden">

                  <img

                    src="/placeholder.svg?height=200&width=200"

                    alt="Person working out"

                    className="w-full h-full object-cover"

                  />

                </div>

                <div className="rounded-lg overflow-hidden">

                  <img

                    src="/placeholder.svg?height=200&width=200"

                    alt="Person lifting weights"

                    className="w-full h-full object-cover"

                  />

                </div>

                <div className="rounded-lg overflow-hidden">

                  <img

                    src="/placeholder.svg?height=200&width=200"

                    alt="Person doing yoga"

                    className="w-full h-full object-cover"

                  />

                </div>

                <div className="rounded-lg overflow-hidden">

                  <img

                    src="/placeholder.svg?height=200&width=200"

                    alt="Person stretching"

                    className="w-full h-full object-cover"

                  />

                </div>

              </div>

            </div>



            <div className="order-1 md:order-2">

              <h2 className="text-3xl md:text-4xl font-bold mb-6">OUR PROGRAMS</h2>

              <p className="mb-6 text-sm md:text-base">

                Our program blends physical fitness with spiritual growth. Offering a 12-week nutrition program and

                Bible Study to nourish both body and soul. With personal training, group workshops, and coaching, we

                help you achieve your fitness goals while fostering a strong sense of community. Our approach combines

                faith-based teachings with expert fitness, and a balanced mindset for long-term well-being.

              </p>

              <a href="#" className="inline-block bg-white text-pink-500 px-4 py-2 rounded text-sm">

                Learn More

              </a>

            </div>

          </div>

        </div>

      </section> */}

      {/* Fitness Plans Section */}

      <section
        className="bg-pink-400 text-white pb-16 "
        style={{
          backgroundImage: `url(${servicebg})`,

          backgroundSize: "cover",

          backgroundPosition: "center",

          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Fitness Plans & Nutritions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Weight Loss */}

            <div className="text-center p-4">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 rounded-full p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="font-bold mb-2">Weight Loss</h3>

              <p className="text-xs opacity-80">
                Our weight loss program is designed to help you shed pounds in a
                healthy and sustainable way through proper nutrition and
                exercise.
              </p>
            </div>

            {/* Classic Yoga */}

            <div className="text-center p-4">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 rounded-full p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="font-bold mb-2">Classic Yoga</h3>

              <p className="text-xs opacity-80">
                Our classic yoga classes focus on traditional poses and
                breathing techniques to improve flexibility, strength, and
                mental clarity.
              </p>
            </div>

            {/* Cycling */}

            <div className="text-center p-4">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 rounded-full p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="font-bold mb-2">Cycling</h3>

              <p className="text-xs opacity-80">
                Our cycling program offers high-intensity cardio workouts that
                build endurance and strengthen your lower body muscles.
              </p>
            </div>

            {/* Body Building */}

            <div className="text-center p-4">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 rounded-full p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="font-bold mb-2">Body Building</h3>

              <p className="text-xs opacity-80">
                Our body building program focuses on progressive resistance
                training to increase muscle mass and overall strength.
              </p>
            </div>

            {/* Meditation */}

            <div className="text-center p-4">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 rounded-full p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="font-bold mb-2">Meditation</h3>

              <p className="text-xs opacity-80">
                Our meditation sessions help you develop mindfulness, reduce
                stress, and improve mental clarity through guided practices.
              </p>
            </div>

            {/* Fitness Running */}

            <div className="text-center p-4">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 rounded-full p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="font-bold mb-2">Fitness Running</h3>

              <p className="text-xs opacity-80">
                Our running program helps you build cardiovascular endurance and
                improve your running technique for better performance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
