import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/livosologo.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about";

  const shouldShowBg = isHomePage ? scrolled : true;
  const shouldaboutBg = isAboutPage ? true : false;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const navLinkClass = (path) =>
    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
      location.pathname === path
        ? "border-[#ff6f59] text-white"
        : "border-transparent text-white hover:border-gray-300 hover:text-gray-200"
    }`;

  return (
    <div
      className={`z-50 fixed w-full top-0 left-0 transition-all duration-300 ${
        shouldShowBg || shouldaboutBg ? "bg-black shadow-md" : "bg-transparent"
      }`}
    >
      <nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 justify-between">
            {/* Logo & Hamburger */}
            <div className="flex items-center gap-4">
              {/* Hamburger on small screens */}
              <div className="sm:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-white focus:outline-none"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
              </div>

              {/* Logo */}
              <Link to="/" className="flex items-center">
                <img
                  src={logo}
                  alt="Livoso Logo"
                  className="h-14 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden sm:flex sm:space-x-8">
              <Link to="/" className={navLinkClass("/")}>
                Home
              </Link>
              <Link to="/join" className={navLinkClass("/join")}>
                Join
              </Link>
              <Link to="/about" className={navLinkClass("/about")}>
                About
              </Link>
              <Link to="/contact" className={navLinkClass("/contact")}>
                Contact
              </Link>
            </div>

            {/* Login Button */}
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

        {/* Mobile Menu Slide-In */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-orange-600 text-white px-4 py-6 space-y-4 absolute top-16 left-0 w-full z-40 transition-all ">
            <Link
              to="/"
              className="block"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/join"
              className="block"
              onClick={() => setMobileMenuOpen(false)}
            >
              Join
            </Link>
            <Link
              to="/about"
              className="block"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;
