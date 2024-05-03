import React, { useRef } from "react";
import { Typography } from "@material-tailwind/react";
import logo from "../images/Our logo-01.png";
import { useLocation, Link } from "react-router-dom";

function Footer() {
  const imageRef = useRef(null);
  const location = useLocation();
  const isHidden =
    location.pathname === "/UserSign" ||
    location.pathname === "/AdminSign" ||
    location.pathname === "/SignUp" ||
    location.pathname === "/";

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    !isHidden && (
      <footer className="bg-gradient-to-r from-[#f5e1bc] to-[#ee5c24] p-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <img
            ref={imageRef}
            className="w-28 h-auto"
            src={logo}
            alt="Company Logo"
          />
        </div>
        <nav className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
          <Link
            to="/AboutUs"
            onClick={handleClick}
            className="text-white hover:text-gray-600 transition duration-300 ease-in-out"
          >
            About Us
          </Link>
          <Link
            to="/PrivacyPolicy"
            onClick={handleClick}
            className="text-white hover:text-gray-600 transition duration-300 ease-in-out"
          >
            License
          </Link>
          <Link
            to="/ContactUs"
            onClick={handleClick}
            className="text-white hover:text-gray-600 transition duration-300 ease-in-out"
          >
            Contact Us
          </Link>
        </nav>
        <Typography
          variant="caption"
          className="text-white text-sm mt-6 md:mt-0"
        >
          &copy; 2024 Entry Eagle
        </Typography>
      </footer>
    )
  );
}

export default Footer;
