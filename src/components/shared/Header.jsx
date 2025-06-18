import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/livosologo.png";
import { Link as ScrollLink } from "react-scroll";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const isHomePage = location.pathname === "/";
  const shouldShowBg = isHomePage ? scrolled : true;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = (path) =>
    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
      location.pathname === path
        ? "border-[#ff6f59] text-white"
        : "border-transparent text-white hover:border-gray-300 hover:text-gray-200"
    }`;

  return (
    <div
      className={`z-50 fixed w-full top-0 left-0 transition-all duration-300 ${
        shouldShowBg ? "bg-black shadow-md" : "bg-transparent"
      }`}
    >
      <nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 justify-between">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  src={logo}
                  alt="Livoso Logo"
                  className="h-20 w-auto object-contain"
                />
              </Link>
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className={navLinkClass("/")}>
                Home
              </Link>

              <Link to="/join" className={navLinkClass("/join")}>
                Join
              </Link>

              <ScrollLink
                to="pricing"
                smooth={true}
                duration={500}
                offset={-70} // if you have a fixed header
                className={navLinkClass("/price")}
                style={{ cursor: "pointer" }}
              >
                Pricing
              </ScrollLink>

              <Link to="/about" className={navLinkClass("/about")}>
                About
              </Link>

              <Link to="/contact" className={navLinkClass("/contact")}>
                Contact
              </Link>
            </div>

            <div>
              <button
                onClick={() => navigate("/login")}
                className="text-white rounded-full px-4 py-1 bg-[#ff6f59] hover:bg-[#ff543e]"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
