// SignIn.js
import React, { useEffect, useState, useContext } from "react";
import logo from "../images/Our logo-01.png";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import { useLocation } from "react-router-dom";

import "./Signin.css";

function Signin() {
  const navigate = useNavigate();

  const [animateLogo, setAnimateLogo] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUserType, setIsLoggedIn, login } = useContext(UserContext);
  const location = useLocation();

  const handleSignIn = async () => {
    try {
      const response = await fetch("http://13.60.94.144:8000/Login/User/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        // Set user type and log in status
        setUserType("user");
        setIsLoggedIn(true);
        login("user");
        const responseData = await response.json(); // Parse response body as JSON
        const { user_id } = responseData.data;
        localStorage.setItem("User_Id", user_id);
        localStorage.setItem("firstname", username);
        // Redirect to UserPage
        navigate("/UserPage");
      } else {
        // Handle sign-in failure
        setError("Failed to sign in. Please check your credentials.");
      }
    } catch (error) {
      setError("Failed to sign in. Please try again.");
    }
  };
  useEffect(() => {
    setAnimateLogo(true);
  }, []);
  useEffect(() => {
    if (location.pathname === "/UserSign") {
      localStorage.clear();
    }
  }, [location.pathname]);
  useEffect(() => {
    setError("");
  }, [username, password]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSignIn();
    }
  };
  return (
    <div
      className="Signin flex flex-col items-center h-[100vh] px-8 gap-2
     justify-around bg-[#FAF0DD] lg:flex-row"
    >
      <div
        className={`logo flex items-center ${
          animateLogo ? "animate-from-right" : ""
        }`}
      >
        <img src={logo} className="w-[360px]" alt="" />
      </div>
      <div className="vertical-line h-[0.5px] w-[400px] lg:h-[400px] lg:w-0"></div>
      <div className="form">
        <div className="flex flex-col gap-4 mb-4">
          <h1 className="text-4xl font-extrabold text-center text-[#494949]">
            Welcome
          </h1>
          <p className="text-md text-center text-[#494949]">
            Please Login to User Dashboard
          </p>
        </div>
        <div className="inputs flex flex-col gap-4 my-3">
          <input
            type="email"
            className="p-2 placeholder-[#EE5C24] rounded-lg"
            placeholder="UserName"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 w-[320px] placeholder-[#EE5C24] rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleSignIn}
            className="bg-[#EE5C24] text-white p-2 rounded-lg"
          >
            Sign In
          </button>
        </div>

        <div className="dont-have flex flex-col gap-3 mt-6 justify-center items-center">
          <p className="text-[#494949] text-sm">
            Don't have an account?{" "}
            <Link to="/SignUp" className="text-[#EE5C24] underline ">
              Sign Up
            </Link>
          </p>
          <p className="text-[#494949] text-sm">
            Are you an admin?{" "}
            <Link to="/AdminSign" className="text-[#EE5C24] underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
