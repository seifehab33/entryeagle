import React, { useRef, useContext, useEffect, useState } from "react";
import "./Navbar.css";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../images/Our logo-01.png";
import UserContext from "../UserContext";
import svg from "../assets/img/team-svgrepo-com.svg";
export function NavbarDefault() {
  const [openNav, setOpenNav] = React.useState(false);
  const [imageSrcAdmin, setImageSrcAdmin] = useState("");
  const [imageSrcUser, setImageSrcUser] = useState("");

  const location = useLocation();
  const AdminId = localStorage.getItem("Admin_id");
  const UserId = localStorage.getItem("User_Id");
  const SignUser = location.pathname === "/UserSign";
  const AdminUser = location.pathname === "/AdminSign";
  const SignUp = location.pathname === "/SignUp";
  const Welcome = location.pathname === "/";

  const { userType, setUserType, setIsLoggedIn, logout, isLoggedIn } =
    useContext(UserContext);
  const navigate = useNavigate();
  const imageRef = useRef(null);

  const handleLogout = () => {
    // Clear authentication data from localStorage
    localStorage.removeItem("userType");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("firstname");
    localStorage.removeItem("token");
    localStorage.removeItem("CommunityId");
    localStorage.removeItem("Admin_Name");
    localStorage.removeItem("Admin_id");
    document.cookie =
      "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    logout();
    // Clear userType and isLoggedIn states
    setUserType(null);
    setIsLoggedIn(false);
    navigate("/UserSign");
  };
  const HandleLogin = () => {
    navigate("/UserSign");
  };
  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        const response = await fetch(
          `https://web-production-22c55.up.railway.app/person/${UserId}/image/`
        );
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageSrcUser(imageUrl);
      } catch (error) {
        console.error("Error fetching user image:", error);
      }
    };

    const fetchAdminImage = async () => {
      try {
        const response = await fetch(
          `https://web-production-22c55.up.railway.app/admin-image/${AdminId}/`
        );
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageSrcAdmin(imageUrl);
      } catch (error) {
        console.error("Error fetching admin image:", error);
      }
    };

    if (userType === "user") {
      fetchUserImage();
    } else if (userType === "admin") {
      fetchAdminImage();
    }
  }, [userType, UserId, AdminId]);
  const handleClickSmoothly = (event) => {
    event.preventDefault();
    const targetId = event.target.hash.substring(1); // Get the target ID without the '#'
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const navListAdmin = (
    <ul className="mt-2 mb-4 flex flex-col items-center gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center justify-between gap-x-2 p-1 font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>

        <NavLink to="/AdminPage" className="flex items-center">
          Home
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
          />
        </svg>

        <NavLink to="/Dashboard" className="flex items-center">
          Dashboard
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 23 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5625 4.27344C0.5625 3.34104 0.932895 2.44682 1.5922 1.78752C2.25151 1.12821 3.14572 0.757813 4.07812 0.757812H17.3594C18.2918 0.757813 19.186 1.12821 19.8453 1.78752C20.5046 2.44682 20.875 3.34104 20.875 4.27344V10.9141C20.4695 10.3738 19.9313 9.94753 19.3125 9.67656V4.27344C19.3125 3.75544 19.1067 3.25865 18.7404 2.89237C18.3742 2.52609 17.8774 2.32031 17.3594 2.32031H4.07812C3.56012 2.32031 3.06334 2.52609 2.69706 2.89237C2.33078 3.25865 2.125 3.75544 2.125 4.27344V17.5547C2.125 18.0727 2.33078 18.5695 2.69706 18.9358C3.06334 19.302 3.56012 19.5078 4.07812 19.5078H11.9148C11.9758 20.0508 12.1508 20.582 12.4461 21.0703H4.07812C3.14572 21.0703 2.25151 20.6999 1.5922 20.0406C0.932895 19.3813 0.5625 18.4871 0.5625 17.5547V4.27344ZM14.9609 15.9922C14.5293 15.5527 14.2078 15.0172 14.0227 14.4297H9.9375C9.7303 14.4297 9.53159 14.512 9.38507 14.6585C9.23856 14.805 9.15625 15.0037 9.15625 15.2109C9.15625 15.4181 9.23856 15.6169 9.38507 15.7634C9.53159 15.9099 9.7303 15.9922 9.9375 15.9922H14.9609ZM15.4062 10.1328C14.866 10.5383 14.4397 11.0765 14.1688 11.6953H9.9375C9.7303 11.6953 9.53159 11.613 9.38507 11.4665C9.23856 11.32 9.15625 11.1213 9.15625 10.9141C9.15625 10.7069 9.23856 10.5081 9.38507 10.3616C9.53159 10.2151 9.7303 10.1328 9.9375 10.1328H15.4062ZM7.59375 6.61719C7.59375 6.92799 7.47028 7.22606 7.25052 7.44583C7.03075 7.6656 6.73268 7.78906 6.42188 7.78906C6.11107 7.78906 5.813 7.6656 5.59323 7.44583C5.37347 7.22606 5.25 6.92799 5.25 6.61719C5.25 6.30639 5.37347 6.00832 5.59323 5.78855C5.813 5.56878 6.11107 5.44531 6.42188 5.44531C6.73268 5.44531 7.03075 5.56878 7.25052 5.78855C7.47028 6.00832 7.59375 6.30639 7.59375 6.61719ZM7.59375 10.9141C7.59375 11.2249 7.47028 11.5229 7.25052 11.7427C7.03075 11.9625 6.73268 12.0859 6.42188 12.0859C6.11107 12.0859 5.813 11.9625 5.59323 11.7427C5.37347 11.5229 5.25 11.2249 5.25 10.9141C5.25 10.6033 5.37347 10.3052 5.59323 10.0854C5.813 9.86565 6.11107 9.74219 6.42188 9.74219C6.73268 9.74219 7.03075 9.86565 7.25052 10.0854C7.47028 10.3052 7.59375 10.6033 7.59375 10.9141ZM7.59375 15.2109C7.59375 15.5217 7.47028 15.8198 7.25052 16.0396C7.03075 16.2593 6.73268 16.3828 6.42188 16.3828C6.11107 16.3828 5.813 16.2593 5.59323 16.0396C5.37347 15.8198 5.25 15.5217 5.25 15.2109C5.25 14.9001 5.37347 14.6021 5.59323 14.3823C5.813 14.1625 6.11107 14.0391 6.42188 14.0391C6.73268 14.0391 7.03075 14.1625 7.25052 14.3823C7.47028 14.6021 7.59375 14.9001 7.59375 15.2109ZM9.15625 6.61719C9.15625 6.40999 9.23856 6.21127 9.38507 6.06476C9.53159 5.91825 9.7303 5.83594 9.9375 5.83594H15.4062C15.6135 5.83594 15.8122 5.91825 15.9587 6.06476C16.1052 6.21127 16.1875 6.40999 16.1875 6.61719C16.1875 6.82439 16.1052 7.0231 15.9587 7.16961C15.8122 7.31613 15.6135 7.39844 15.4062 7.39844H9.9375C9.7303 7.39844 9.53159 7.31613 9.38507 7.16961C9.23856 7.0231 9.15625 6.82439 9.15625 6.61719ZM20.4844 13.2578C20.4844 13.983 20.1963 14.6785 19.6835 15.1913C19.1707 15.7041 18.4752 15.9922 17.75 15.9922C17.0248 15.9922 16.3293 15.7041 15.8165 15.1913C15.3037 14.6785 15.0156 13.983 15.0156 13.2578C15.0156 12.5326 15.3037 11.8371 15.8165 11.3243C16.3293 10.8115 17.0248 10.5234 17.75 10.5234C18.4752 10.5234 19.1707 10.8115 19.6835 11.3243C20.1963 11.8371 20.4844 12.5326 20.4844 13.2578ZM22.4375 19.0688C22.4375 20.6492 21.0984 22.2422 17.75 22.2422C14.4016 22.2422 13.0625 20.6555 13.0625 19.0688C13.0625 18.025 13.9078 17.1641 14.9508 17.1641H20.5492C21.5922 17.1641 22.4375 18.025 22.4375 19.0688Z"
            fill="#545454"
          />
        </svg>

        <NavLink to="/Person'sList" className="flex items-center">
          Person's List
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.04102 19.2539C6.24023 18.668 5.63086 17.6309 5.63086 16.5645C5.63086 14.791 7.07422 13.3477 8.84766 13.3477C10.0762 13.3477 10.8711 13.7734 11.4902 14.666C11.7266 15.0078 12.0293 14.9473 12.0352 14.584L12.0059 13.5723C12.0059 11.8555 10.7207 11.0781 8.3125 11.0781H6.82617C4.74805 11.0781 3.4375 11.998 3.4375 13.7988V18.707C3.4375 19.4551 4.04492 20.0625 4.79297 20.0625H6.10938C6.11328 20.0586 6.11523 20.0547 6.11914 20.0508C6.35352 19.75 7.04102 19.2539 7.04102 19.2539Z"
            fill="#494949"
          />
          <path
            d="M7.72461 10.3711C9.36636 10.3711 10.6973 9.04019 10.6973 7.39844C10.6973 5.75669 9.36636 4.42578 7.72461 4.42578C6.08286 4.42578 4.75195 5.75669 4.75195 7.39844C4.75195 9.04019 6.08286 10.3711 7.72461 10.3711Z"
            fill="#494949"
          />
          <path
            d="M17.6035 11.0957H16.3672C14.5801 11.0957 13.1289 12.2734 13.1289 14.582V14.627C13.1289 14.7988 13.1621 14.8926 13.2188 14.9102C13.3164 14.9434 13.4082 14.8184 13.4941 14.6816C14.0762 13.7637 14.8418 13.3477 16.0703 13.3477C17.8437 13.3477 19.2871 14.791 19.2871 16.5645C19.2871 17.6309 18.7637 18.5762 17.9609 19.1602C17.9609 19.1602 18.6289 19.6758 18.9492 20.043C18.9551 20.0488 18.959 20.0547 18.9648 20.0605H19.8809C20.6289 20.0605 21.2363 19.4531 21.2363 18.7051V14.334C21.2402 12.1309 19.3926 11.0957 17.6035 11.0957ZM20.6758 8.96875C20.291 8.19727 20.3027 7.50195 20.0996 6.77734L20.0937 6.7832C19.8105 5.43555 18.6172 4.42383 17.1855 4.42383C15.7559 4.42383 14.5625 5.43359 14.2773 6.7793V6.77734C14.0742 7.5 14.0879 8.19531 13.7012 8.96875C13.375 9.62305 13.043 9.58203 13.043 9.93164C13.043 10.2812 13.5449 10.5547 14.166 10.6328C14.668 10.6973 15.209 10.6523 15.627 10.4883C14.9395 9.98438 14.6074 9.23242 14.5195 8.87891C14.4648 8.66016 14.4063 8.45313 14.5332 8.42773C14.6934 8.39453 14.6523 8.68945 14.9824 9.12305C15.6523 9.99805 16.2031 10.3047 17.1777 10.3066C18.1523 10.3047 18.7031 9.99805 19.373 9.12305C19.7051 8.69141 19.6602 8.43164 19.8223 8.42773C19.9746 8.42578 19.8945 8.69531 19.8398 8.91406C19.752 9.26367 19.4238 9.99609 18.7461 10.4883C19.1641 10.6523 19.7051 10.6973 20.209 10.6328C20.8301 10.5527 21.332 10.2812 21.332 9.93164C21.332 9.58203 21.002 9.62305 20.6758 8.96875Z"
            fill="#494949"
          />
          <path
            d="M16.0391 18.9609C17.3626 18.9609 18.4355 17.888 18.4355 16.5645C18.4355 15.2409 17.3626 14.168 16.0391 14.168C14.7155 14.168 13.6426 15.2409 13.6426 16.5645C13.6426 17.888 14.7155 18.9609 16.0391 18.9609Z"
            fill="#494949"
          />
          <path
            d="M13.6581 21.6348C13.4628 21.6348 13.3163 21.4492 13.3671 21.2617C13.6327 20.291 14.7245 19.502 16.0331 19.502C17.3475 19.502 18.4413 20.2695 18.703 21.2637C18.7518 21.4512 18.6073 21.6367 18.412 21.6367C18.412 21.6348 13.6581 21.6348 13.6581 21.6348Z"
            fill="#494949"
          />
          <path
            d="M8.89062 18.9609C10.2142 18.9609 11.2871 17.888 11.2871 16.5645C11.2871 15.2409 10.2142 14.168 8.89062 14.168C7.56708 14.168 6.49414 15.2409 6.49414 16.5645C6.49414 17.888 7.56708 18.9609 8.89062 18.9609Z"
            fill="#494949"
          />
          <path
            d="M6.50966 21.6348C6.31435 21.6348 6.16786 21.4492 6.21864 21.2617C6.48427 20.291 7.57606 19.502 8.88466 19.502C10.1991 19.502 11.2929 20.2696 11.5546 21.2637C11.6034 21.4512 11.4589 21.6367 11.2636 21.6367C11.2636 21.6348 6.50966 21.6348 6.50966 21.6348ZM13.5936 18.5235C13.4296 18.3379 13.0272 18.2461 12.7245 18.4903C12.6112 18.5821 12.4608 18.7774 12.4608 18.7774C12.4608 18.7774 12.3104 18.5821 12.1972 18.4903C11.8944 18.2461 11.4921 18.3379 11.328 18.5235C11.0683 18.8184 11.1093 19.2051 11.4354 19.6055C11.8827 20.1543 12.4608 20.6778 12.4608 20.6797C12.4608 20.6797 13.039 20.1563 13.4862 19.6055C13.8124 19.2051 13.8534 18.8184 13.5936 18.5235Z"
            fill="#494949"
          />
        </svg>

        <NavLink to="/CommunityList " className="flex items-center">
          Community's List
        </NavLink>
      </Typography>
    </ul>
  );
  const navListUser = (
    <ul className="mt-2 mb-4 flex flex-col items-center gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center justify-between gap-x-2 p-1 font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>

        <NavLink to="/UserPage" className="flex items-center">
          Home
        </NavLink>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center justify-between gap-x-2 p-1 font-medium"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 22 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.0625 4.27344C0.0625 3.34104 0.432895 2.44682 1.0922 1.78752C1.75151 1.12821 2.64572 0.757813 3.57812 0.757812H16.8594C17.7918 0.757813 18.686 1.12821 19.3453 1.78752C20.0046 2.44682 20.375 3.34104 20.375 4.27344V10.9141C19.9695 10.3738 19.4313 9.94753 18.8125 9.67656V4.27344C18.8125 3.75544 18.6067 3.25865 18.2404 2.89237C17.8742 2.52609 17.3774 2.32031 16.8594 2.32031H3.57812C3.06012 2.32031 2.56334 2.52609 2.19706 2.89237C1.83078 3.25865 1.625 3.75544 1.625 4.27344V17.5547C1.625 18.0727 1.83078 18.5695 2.19706 18.9358C2.56334 19.302 3.06012 19.5078 3.57812 19.5078H11.4148C11.4758 20.0508 11.6508 20.582 11.9461 21.0703H3.57812C2.64572 21.0703 1.75151 20.6999 1.0922 20.0406C0.432895 19.3813 0.0625 18.4871 0.0625 17.5547V4.27344ZM14.4609 15.9922C14.0293 15.5527 13.7078 15.0172 13.5227 14.4297H9.4375C9.2303 14.4297 9.03159 14.512 8.88507 14.6585C8.73856 14.805 8.65625 15.0037 8.65625 15.2109C8.65625 15.4181 8.73856 15.6169 8.88507 15.7634C9.03159 15.9099 9.2303 15.9922 9.4375 15.9922H14.4609ZM14.9062 10.1328C14.366 10.5383 13.9397 11.0765 13.6688 11.6953H9.4375C9.2303 11.6953 9.03159 11.613 8.88507 11.4665C8.73856 11.32 8.65625 11.1213 8.65625 10.9141C8.65625 10.7069 8.73856 10.5081 8.88507 10.3616C9.03159 10.2151 9.2303 10.1328 9.4375 10.1328H14.9062ZM7.09375 6.61719C7.09375 6.92799 6.97028 7.22606 6.75052 7.44583C6.53075 7.6656 6.23268 7.78906 5.92188 7.78906C5.61107 7.78906 5.313 7.6656 5.09323 7.44583C4.87347 7.22606 4.75 6.92799 4.75 6.61719C4.75 6.30639 4.87347 6.00832 5.09323 5.78855C5.313 5.56878 5.61107 5.44531 5.92188 5.44531C6.23268 5.44531 6.53075 5.56878 6.75052 5.78855C6.97028 6.00832 7.09375 6.30639 7.09375 6.61719ZM7.09375 10.9141C7.09375 11.2249 6.97028 11.5229 6.75052 11.7427C6.53075 11.9625 6.23268 12.0859 5.92188 12.0859C5.61107 12.0859 5.313 11.9625 5.09323 11.7427C4.87347 11.5229 4.75 11.2249 4.75 10.9141C4.75 10.6033 4.87347 10.3052 5.09323 10.0854C5.313 9.86565 5.61107 9.74219 5.92188 9.74219C6.23268 9.74219 6.53075 9.86565 6.75052 10.0854C6.97028 10.3052 7.09375 10.6033 7.09375 10.9141ZM7.09375 15.2109C7.09375 15.5217 6.97028 15.8198 6.75052 16.0396C6.53075 16.2593 6.23268 16.3828 5.92188 16.3828C5.61107 16.3828 5.313 16.2593 5.09323 16.0396C4.87347 15.8198 4.75 15.5217 4.75 15.2109C4.75 14.9001 4.87347 14.6021 5.09323 14.3823C5.313 14.1625 5.61107 14.0391 5.92188 14.0391C6.23268 14.0391 6.53075 14.1625 6.75052 14.3823C6.97028 14.6021 7.09375 14.9001 7.09375 15.2109ZM8.65625 6.61719C8.65625 6.40999 8.73856 6.21127 8.88507 6.06476C9.03159 5.91825 9.2303 5.83594 9.4375 5.83594H14.9062C15.1135 5.83594 15.3122 5.91825 15.4587 6.06476C15.6052 6.21127 15.6875 6.40999 15.6875 6.61719C15.6875 6.82439 15.6052 7.0231 15.4587 7.16961C15.3122 7.31613 15.1135 7.39844 14.9062 7.39844H9.4375C9.2303 7.39844 9.03159 7.31613 8.88507 7.16961C8.73856 7.0231 8.65625 6.82439 8.65625 6.61719ZM19.9844 13.2578C19.9844 13.983 19.6963 14.6785 19.1835 15.1913C18.6707 15.7041 17.9752 15.9922 17.25 15.9922C16.5248 15.9922 15.8293 15.7041 15.3165 15.1913C14.8037 14.6785 14.5156 13.983 14.5156 13.2578C14.5156 12.5326 14.8037 11.8371 15.3165 11.3243C15.8293 10.8115 16.5248 10.5234 17.25 10.5234C17.9752 10.5234 18.6707 10.8115 19.1835 11.3243C19.6963 11.8371 19.9844 12.5326 19.9844 13.2578ZM21.9375 19.0688C21.9375 20.6492 20.5984 22.2422 17.25 22.2422C13.9016 22.2422 12.5625 20.6555 12.5625 19.0688C12.5625 18.025 13.4078 17.1641 14.4508 17.1641H20.0492C21.0922 17.1641 21.9375 18.025 21.9375 19.0688Z"
            fill="#494949"
          />
        </svg>

        <NavLink to="/Relatives'List" className="flex items-center">
          Relative's List
        </NavLink>
      </Typography>
    </ul>
  );
  const navListNormal = (
    <ul className="mt-2 mb-4 flex flex-col items-center gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center justify-between gap-x-2 p-1 font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          className="size-6"
          viewBox="0 0 50 50"
        >
          <path d="M 25 1 C 11.222656 1 0 10.878906 0 23.1875 C 0 29.234375 2.773438 34.664063 7.21875 38.6875 C 6.546875 40.761719 5.046875 42.398438 3.53125 43.65625 C 2.714844 44.332031 1.933594 44.910156 1.3125 45.46875 C 1.003906 45.746094 0.722656 46.027344 0.5 46.375 C 0.277344 46.722656 0.078125 47.21875 0.21875 47.75 L 0.34375 48.15625 L 0.6875 48.375 C 1.976563 49.117188 3.582031 49.246094 5.3125 49.125 C 7.042969 49.003906 8.929688 48.605469 10.78125 48.09375 C 14.375 47.101563 17.75 45.6875 19.53125 44.90625 C 21.289063 45.273438 23.054688 45.5 24.90625 45.5 C 38.683594 45.5 49.90625 35.621094 49.90625 23.3125 C 49.90625 11.007813 38.78125 1 25 1 Z M 25 3 C 37.820313 3 47.90625 12.214844 47.90625 23.3125 C 47.90625 34.402344 37.730469 43.5 24.90625 43.5 C 23.078125 43.5 21.355469 43.320313 19.625 42.9375 L 19.28125 42.84375 L 19 43 C 17.328125 43.738281 13.792969 45.179688 10.25 46.15625 C 8.476563 46.644531 6.710938 47.019531 5.1875 47.125 C 4.167969 47.195313 3.539063 46.953125 2.84375 46.78125 C 3.339844 46.355469 4.019531 45.847656 4.8125 45.1875 C 6.554688 43.742188 8.644531 41.730469 9.375 38.75 L 9.53125 38.125 L 9.03125 37.75 C 4.625 34.015625 2 28.875 2 23.1875 C 2 12.097656 12.175781 3 25 3 Z M 23.8125 12.8125 C 23.511719 12.8125 23.40625 12.988281 23.40625 13.1875 L 23.40625 15.8125 C 23.40625 16.113281 23.613281 16.1875 23.8125 16.1875 L 26.1875 16.1875 C 26.488281 16.1875 26.59375 16.011719 26.59375 15.8125 L 26.59375 13.1875 C 26.59375 12.886719 26.386719 12.8125 26.1875 12.8125 Z M 23.90625 20.09375 C 23.605469 20.09375 23.5 20.300781 23.5 20.5 L 23.5 33.90625 C 23.5 34.207031 23.707031 34.3125 23.90625 34.3125 L 23.90625 34.40625 L 26.1875 34.40625 C 26.488281 34.40625 26.59375 34.199219 26.59375 34 L 26.59375 20.5 C 26.59375 20.199219 26.386719 20.09375 26.1875 20.09375 Z"></path>
        </svg>

        <a
          href="#about"
          className="flex items-center"
          onClick={handleClickSmoothly}
        >
          About Us
        </a>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center justify-between gap-x-2 p-1 font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
          />
        </svg>

        <a
          href="#service"
          className="flex items-center"
          onClick={handleClickSmoothly}
        >
          Service
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center justify-between gap-x-2 p-1 font-medium"
      >
        <img src={svg} className="size-6" alt="" />
        <a
          href="#team"
          className="flex items-center"
          onClick={handleClickSmoothly}
        >
          The Team
        </a>
      </Typography>
    </ul>
  );
  return (
    <>
      {!SignUser && !AdminUser && !SignUp && !Welcome && (
        <Navbar className="z-50 py-2 lg:px-8 lg:py-4 max-w-full">
          <div className="justify-between flex items-center  text-blue-gray-900 ">
            <Typography className="">
              <img ref={imageRef} className="w-22 h-20" src={logo} alt="" />
            </Typography>
            <div className="hidden lg:block">
              {userType === "user"
                ? navListUser
                : userType === "admin"
                ? navListAdmin
                : navListNormal}
            </div>
            {/* <div className="flex justify-end gap-x-4 items-center ">
              {userType === "user" && imageSrcUser ? (
                <Link
                  className="hidden lg:inline-block pDetails"
                  to={`ProfileDetails/${UserId}`}
                >
                  <img
                    src={imageSrcUser}
                    alt="User"
                    className="w-12 h-12 rounded-full cursor-pointer"
                  />
                </Link>
              ) : userType === "admin" && imageSrcAdmin ? (
                <Link
                  className="hidden lg:inline-block pDetails"
                  to={`Admin-Details/${AdminId}`}
                >
                  <img
                    src={imageSrcAdmin}
                    alt="Admin"
                    className="w-12 h-12 rounded-full cursor-pointer"
                  />
                </Link>
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                  </svg>
                </div>
              )}

              <div
                variant="text"
                size="sm"
                className="hidden lg:inline-block pLogout"
                onClick={handleLogout}
              >
                <div
                  className="profile"
                  style={{ width: "48px", height: "48px" }} // Explicitly set width and height
                >
                  <button className="">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 26 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.2188 6.39062V8.82812L18.7813 7.28125V4.40625L18 3.625H3.9375L3.15625 4.40625V5.16563L3.125 5.1875V21.2656L3.6875 21.9844L11.5 24.6719L12.5 23.9375V22.375H18L18.7813 21.5938V18.7656L17.2188 17.2031V20.8125H12.5V7.85938L11.9844 7.14062L6.30625 5.1875H17.2188V6.39062ZM10.9375 22.8125L4.6875 20.7188V6.3125L10.9375 8.40625V22.8125ZM21.125 13.75H13.3594V12.1875H21.0625L18.5625 9.6875L19.6719 8.59375L23.5312 12.4375V13.5469L19.6406 17.4219L18.5469 16.3281L21.125 13.75Z"
                        fill="#EE5C24"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div> */}
            <div className="flex justify-end gap-x-4 items-center">
              {isLoggedIn ? (
                // Render user or admin profile image based on userType
                userType === "user" && imageSrcUser ? (
                  <Link
                    className="hidden lg:inline-block pDetails"
                    to={`ProfileDetails/${UserId}`}
                  >
                    <img
                      src={imageSrcUser}
                      alt="User"
                      className="w-12 h-12 rounded-full cursor-pointer"
                    />
                  </Link>
                ) : userType === "admin" && imageSrcAdmin ? (
                  <Link
                    className="hidden lg:inline-block pDetails"
                    to={`Admin-Details/${AdminId}`}
                  >
                    <img
                      src={imageSrcAdmin}
                      alt="Admin"
                      className="w-12 h-12 rounded-full cursor-pointer"
                    />
                  </Link>
                ) : (
                  // Render a default icon if userType is not provided or unrecognized
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                    </svg>
                  </div>
                )
              ) : (
                // Render login icon if user is not logged in
                <div
                  className="w-10 h-10 rounded-full bg-gray-200 hidden lg:flex  items-center justify-center cursor-pointer "
                  onClick={HandleLogin}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="Login"
                    className="w-6 h-6 flex justify-center items-center "
                  >
                    <path
                      d="M14 10 8 5v3H1v4h7v3l6-5zm3 7H9v2h8c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2H9v2h8v14z"
                      fill="#ee5c24"
                      class="color000000 svgShape"
                    ></path>
                  </svg>
                </div>
              )}

              {/* Render logout button */}
              {/* <div
                variant="text"
                size="sm"
                className="hidden lg:inline-block pLogout"
                onClick={handleLogout}
              >
                <div
                  className="profile"
                  style={{ width: "48px", height: "48px" }}
                >
                  <button className="">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 26 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.2188 6.39062V8.82812L18.7813 7.28125V4.40625L18 3.625H3.9375L3.15625 4.40625V5.16563L3.125 5.1875V21.2656L3.6875 21.9844L11.5 24.6719L12.5 23.9375V22.375H18L18.7813 21.5938V18.7656L17.2188 17.2031V20.8125H12.5V7.85938L11.9844 7.14062L6.30625 5.1875H17.2188V6.39062ZM10.9375 22.8125L4.6875 20.7188V6.3125L10.9375 8.40625V22.8125ZM21.125 13.75H13.3594V12.1875H21.0625L18.5625 9.6875L19.6719 8.59375L23.5312 12.4375V13.5469L19.6406 17.4219L18.5469 16.3281L21.125 13.75Z"
                        fill="#EE5C24"
                      />
                    </svg>
                  </button>
                </div>
              </div> */}
              {isLoggedIn && (
                <div
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block pLogout"
                  onClick={handleLogout}
                >
                  <div
                    className="profile"
                    style={{ width: "48px", height: "48px" }}
                  >
                    <button className="">
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 26 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.2188 6.39062V8.82812L18.7813 7.28125V4.40625L18 3.625H3.9375L3.15625 4.40625V5.16563L3.125 5.1875V21.2656L3.6875 21.9844L11.5 24.6719L12.5 23.9375V22.375H18L18.7813 21.5938V18.7656L17.2188 17.2031V20.8125H12.5V7.85938L11.9844 7.14062L6.30625 5.1875H17.2188V6.39062ZM10.9375 22.8125L4.6875 20.7188V6.3125L10.9375 8.40625V22.8125ZM21.125 13.75H13.3594V12.1875H21.0625L18.5625 9.6875L19.6719 8.59375L23.5312 12.4375V13.5469L19.6406 17.4219L18.5469 16.3281L21.125 13.75Z"
                          fill="#EE5C24"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>

          <Collapse open={openNav}>
            <div className="flex justify-center flex-col mt-10">
              {!isLoggedIn || userType === null ? (
                <>
                  <div>{navListNormal}</div>

                  <div
                    className="w-10 h-10 rounded-full bg-gray-200 flex text-center items-center justify-center cursor-pointer"
                    onClick={HandleLogin}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      id="Login"
                      className="w-6 h-6 flex justify-center items-center"
                    >
                      <path
                        d="M14 10 8 5v3H1v4h7v3l6-5zm3 7H9v2h8c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2H9v2h8v14z"
                        fill="#ee5c24"
                        className="color000000 svgShape"
                      ></path>
                    </svg>
                  </div>
                </>
              ) : (
                <>
                  <Button fullWidth variant="text" size="sm" className="">
                    {userType === "user" && imageSrcUser ? (
                      <>
                        <div>{navListUser}</div>
                        <Link to={`ProfileDetails/${UserId}`}>
                          <img
                            src={imageSrcUser}
                            alt="User"
                            className="w-12 h-12 rounded-full cursor-pointer"
                          />
                        </Link>
                      </>
                    ) : userType === "admin" && imageSrcAdmin ? (
                      <>
                        <div>{navListAdmin}</div>
                        <Link
                          className=" pDetails"
                          to={`Admin-Details/${AdminId}`}
                        >
                          <img
                            src={imageSrcAdmin}
                            alt="Admin"
                            className="w-12 h-12 rounded-full cursor-pointer"
                          />
                        </Link>
                      </>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6 text-gray-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 14l9-5-9-5-9 5 9 5z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 14l9-5-9-5-9 5 9 5z"
                          />
                        </svg>
                      </div>
                    )}
                  </Button>
                  <Button
                    fullWidth
                    variant="text"
                    size="sm"
                    className=""
                    onClick={handleLogout}
                  >
                    <div
                      className="profile"
                      style={{ width: "48px", height: "48px" }}
                    >
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 26 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.2188 6.39062V8.82812L18.7813 7.28125V4.40625L18 3.625H3.9375L3.15625 4.40625V5.16563L3.125 5.1875V21.2656L3.6875 21.9844L11.5 24.6719L12.5 23.9375V22.375H18L18.7813 21.5938V18.7656L17.2188 17.2031V20.8125H12.5V7.85938L11.9844 7.14062L6.30625 5.1875H17.2188V6.39062ZM10.9375 22.8125L4.6875 20.7188V6.3125L10.9375 8.40625V22.8125ZM21.125 13.75H13.3594V12.1875H21.0625L18.5625 9.6875L19.6719 8.59375L23.5312 12.4375V13.5469L19.6406 17.4219L18.5469 16.3281L21.125 13.75Z"
                          fill="#EE5C24"
                        />
                      </svg>
                    </div>
                  </Button>
                </>
              )}
            </div>
          </Collapse>
        </Navbar>
      )}
    </>
  );
}
