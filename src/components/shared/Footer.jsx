import React, { useEffect } from "react";
import logo from "../assets/images/livosologo.png"; // Make sure path is correct

const Footer = () => {
  useEffect(() => {
    // ✅ Official Tawk.to embed script
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script");
      s1.async = true;
      s1.src = "https://embed.tawk.to/685525686ebc86190be10474/DEFAULT"; 
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      var s0 = document.getElementsByTagName("script")[0];
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);
  

  return (
    <>
      <footer className="bg-black text-white">
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
              <p className="text-gray-400">
                Making fitness easier and more enjoyable for everyone.
              </p>

              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12..." />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2..." />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251..." />
                  </svg>
                </a>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-500">Membership</h3>
                  <ul className="mt-4 space-y-4 text-gray-400">
                    <li><a href="/plans" className="hover:text-white">Plans & Pricing</a></li>
                    <li><a href="/join" className="hover:text-white">Join Now</a></li>
                    <li><a href="/schedule" className="hover:text-white">Class Schedule</a></li>
                    <li><a href="/locations" className="hover:text-white">Our Locations</a></li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-500">Programs</h3>
                  <ul className="mt-4 space-y-4 text-gray-400">
                    <li><a href="/trainers" className="hover:text-white">Personal Trainers</a></li>
                    <li><a href="/workouts" className="hover:text-white">Workout Plans</a></li>
                    <li><a href="/nutrition" className="hover:text-white">Nutrition</a></li>
                    <li><a href="/transformations" className="hover:text-white">Success Stories</a></li>
                  </ul>
                </div>
              </div>

              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-500">Support</h3>
                  <ul className="mt-4 space-y-4 text-gray-400">
                    <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
                    <li><a href="/faq" className="hover:text-white">FAQs</a></li>
                    <li><a href="/support" className="hover:text-white">Help Center</a></li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-500">Legal</h3>
                  <ul className="mt-4 space-y-4 text-gray-400">
                    <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
                    <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
                    <li><a href="/disclaimer" className="hover:text-white">Disclaimer</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400 text-base">
              &copy; 2025 Livoso Gym, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919124538064"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 32 32">
          <path d="M16.003 2.004c-7.726 0-14 6.273-14 14 0 2.47.648 4.885 1.88 7.013L2 30l7.193-1.86a13.916 13.916 0 006.81 1.748h.001c7.727 0 14-6.274 14-14s-6.273-14-14-14zm.001 25.493a11.48 11.48 0 01-5.77-1.55l-.413-.243-4.268 1.104 1.137-4.132-.27-.428a11.437 11.437 0 01-1.75-6.045c0-6.332 5.149-11.481 11.481-11.481 3.07 0 5.954 1.196 8.121 3.363a11.414 11.414 0 013.36 8.119c0 6.332-5.149 11.481-11.481 11.481zm6.333-9.706c-.348-.174-2.059-1.016-2.379-1.134-.32-.117-.554-.174-.787.174s-.903 1.134-1.107 1.367c-.204.234-.403.261-.751.087s-1.463-.539-2.788-1.719c-1.03-.92-1.726-2.054-1.928-2.4s-.021-.522.153-.695c.157-.156.348-.407.522-.609.174-.204.232-.348.348-.578.117-.234.058-.435-.029-.609-.087-.174-.783-1.893-1.073-2.595-.282-.678-.57-.586-.787-.597l-.674-.012c-.232 0-.609.087-.928.435s-1.22 1.191-1.22 2.904 1.248 3.369 1.42 3.603c.174.234 2.454 3.729 5.946 5.229.83.36 1.477.575 1.979.736.831.265 1.587.228 2.187.139.667-.1 2.059-.841 2.35-1.652.292-.812.292-1.508.204-1.652-.087-.145-.317-.232-.665-.406z" />
        </svg>
      </a>
    </>
  );
};

export default Footer;
