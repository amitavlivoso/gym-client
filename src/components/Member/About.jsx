import React from "react";
import aboutimg from "../../assets/image/about1.jpg";

const About = () => {
  return (
    <div>
      <div className="mx-auto max-w-5xl    md:max-w-7xl text-center mt-16 mb-8 ">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">
          About Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-18 rounded-4xl">
          <a href="">
            <img
              src={aboutimg}
              alt="hghg"
              className="w-[511px] h-[443px] object-cover rounded-2xl cursor-pointer hover:opacity-80 transition"
            />
          </a>

          {/* content section  */}

          <div className="flex flex-col justify-center items-start">
            <h2 className="text-3xl font-bold mb-4">
              We are the best gym in the world
            </h2>

            <p className="text-gray-600 mb-4 text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>

            <button className="bg-[#FF6F59] hover:bg-indigo-700 text-gray-900 font-bold py-2 px-8 rounded shadow-lg transform transition hover:scale-105 duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
