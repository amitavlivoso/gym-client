import React from "react";
import logo from "../assets/images/livosologo.png"; // adjust the path if needed

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <a href="/" className="flex items-center">
              <img
                src={logo}
                alt="Gym Logo"
                className="h-20 w-auto object-contain"
              />
            </a>

            <p className="text-gray-600 text-base">
              Making fitness easier and more enjoyable for everyone.
            </p>

            <div className="flex space-x-6">
              {/* Social Icons (same as before) */}
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <span className="sr-only">Facebook</span>
                {/* Facebook Icon */}
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M22 12..." clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <span className="sr-only">Instagram</span>
                {/* Instagram Icon */}
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2..."
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <span className="sr-only">Twitter</span>
                {/* Twitter Icon */}
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251..." />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
                  Membership
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="/plans"
                      className="text-base text-gray-400 hover:text-gray-200"
                    >
                      Plans & Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="/join"
                      className="text-base text-gray-400 hover:text-gray-200"
                    >
                      Join Now
                    </a>
                  </li>
                  <li>
                    <a
                      href="/schedule"
                      className="text-base text-gray-400 hover:text-gray-200"
                    >
                      Class Schedule
                    </a>
                  </li>
                  <li>
                    <a
                      href="/locations"
                      className="text-base text-gray-400 hover:text-gray-200"
                    >
                      Our Locations
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
                  Programs
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="/trainers"
                      className="text-base text-gray-400 hover:text-gray-200"
                    >
                      Personal Trainers
                    </a>
                  </li>
                  <li>
                    <a
                      href="/workouts"
                      className="text-base text-gray-400 hover:text-gray-200"
                    >
                      Workout Plans
                    </a>
                  </li>
                  <li>
                    <a
                      href="/nutrition"
                      className="text-base text-gray-400 hover:text-gray-200"
                    >
                      Nutrition
                    </a>
                  </li>
                  <li>
                    <a
                      href="/transformations"
                      className="text-base text-gray-400 hover:text-gray-200"
                    >
                      Success Stories
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="/contact"
                      className="text-base text-gray-400 hover:text-gray-200"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="/faq"
                      className="text-base text-gray-400 hover:text-gray-200"
                    >
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a
                      href="/support"
                      className="text-base text-gray-400 hover:text-gray-200"
                    >
                      Help Center
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="/privacy"
                      className="text-base text-gray-400 hover:text-gray-200"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/terms"
                      className="text-base text-gray-400 hover:text-gray-200"
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="/disclaimer"
                      className="text-base text-gray-400 hover:text-gray-200"
                    >
                      Disclaimer
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; 2025 Livoso Gym, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
