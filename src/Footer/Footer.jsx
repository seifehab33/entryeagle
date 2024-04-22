// import React from "react";
// import { Typography } from "@material-tailwind/react";
// import logo from "../images/Our logo-01.png";
// import { useLocation, Link } from "react-router-dom";
// function Footer() {
//   const location = useLocation();
//   const SignUser = location.pathname === "/UserSign";
//   const AdminUser = location.pathname === "/AdminSign";
//   const SignUp = location.pathname === "/SignUp";
//   const Welcome = location.pathname === "/";
//   const handleClick = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };
//   return (
//     !SignUser &&
//     !AdminUser &&
//     !SignUp &&
//     !Welcome && (
//       <footer className="w-full bg-[#f5e1bc] p-4 ">
//         <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between">
//           <img className="w-22 h-20" src={logo} alt="" />
//           <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
//             <li>
//               <Link to="/AboutUs" onClick={handleClick}>
//                 <Typography
//                   as="a"
//                   href=""
//                   color="blue-gray"
//                   className="font-normal transition-colors hover:text-[#ee5c24] focus:text-[#ee5c24]"
//                 >
//                   About Us
//                 </Typography>
//               </Link>
//             </li>
//             <li>
//               <Link to="/PrivacyPolicy" onClick={handleClick}>
//                 <Typography
//                   as="a"
//                   href="#"
//                   color="blue-gray"
//                   className="font-normal transition-colors hover:text-[#ee5c24] focus:text-[#ee5c24]"
//                 >
//                   License
//                 </Typography>
//               </Link>
//             </li>

//             <li>
//               <Link to="/ContactUs" onClick={handleClick}>
//                 <Typography
//                   as="a"
//                   href="#"
//                   color="blue-gray"
//                   className="font-normal transition-colors hover:text-[#ee5c24] focus:text-[#ee5c24]"
//                 >
//                   Contact Us
//                 </Typography>
//               </Link>
//             </li>
//           </ul>
//         </div>
//         <hr className="my-5 border-blue-gray-50" />
//         <Typography color="blue-gray" className="text-center font-bold">
//           &copy; 2023 Entry Eagle
//         </Typography>
//       </footer>
//     )
//   );
// }

// export default Footer;

import React, { useRef, useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import logo from "../images/Our logo-01.png";
import { useLocation, Link } from "react-router-dom";

function Footer() {
  const [disableRightClick, setDisableRightClick] = useState(true);
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

  useEffect(() => {
    const preventRightClick = (e) => {
      if (disableRightClick) {
        e.preventDefault();
      }
    };

    const image = imageRef.current;

    // Check if the image element exists before adding the event listener
    if (image) {
      image.addEventListener("contextmenu", preventRightClick);

      // Clean up the event listener when the component unmounts
      return () => {
        image.removeEventListener("contextmenu", preventRightClick);
      };
    }
  }, [disableRightClick]);
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
