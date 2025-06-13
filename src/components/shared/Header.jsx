import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo - replace with your actual logo */}

        <div className="text-xl font-bold">LOGO</div>

        {/* Navigation Links */}

        <nav className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-gray-800 font-semibold text-xl hover:text-pink-600 transition-colors"
          >
            Home
          </Link>

          <a
            href="#"
            className="text-gray-800 font-semibold text-xl hover:text-pink-600 transition-colors"
          >
            About Us
          </a>

          <a
            href="#"
            className="text-gray-800 font-semibold text-xl hover:text-pink-600 transition-colors"
          >
            Gallery
          </a>

          <a
            href="#"
            className="text-gray-800 font-semibold text-xl hover:text-pink-600 transition-colors"
          >
            Category
          </a>

          <a
            href="#"
            className="text-gray-800 font-semibold text-xl hover:text-pink-600 transition-colors"
          >
            Contact Us
          </a>

          <Link
            to="/login"
            className=" font-semibold text-lg hover:text-pink-600 transition-colors bg-pink-600 hover:bg-white border text-white px-9 py-1 rounded-2xl "
          >
            Login
          </Link>
        </nav>

        {/* Mobile menu button - hidden on desktop */}

        <button className="md:hidden text-gray-800">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
