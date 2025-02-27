// SignIn.js
import React, { useEffect, useState, useContext } from "react";
import logo from "../images/Our logo-01.png";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";
import UserContext from "../UserContext";
function AdminSign({ onSignIn }) {
  const navigate = useNavigate();
  const [animateLogo, setAnimateLogo] = useState(false);
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUserType, setIsLoggedIn, login } = useContext(UserContext);

  const handleSignIn = async () => {
    try {
      const response = await fetch(
        "https://web-production-22c55.up.railway.app/Login/Admin/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      if (response.ok) {
        // localStorage.setItem("authentication", "admin");
        const responseData = await response.json(); // Parse response body as JSON
        const { admin_name, Admin_id } = responseData.data;
        setUserType("admin");
        setIsLoggedIn(true);
        login("admin");
        localStorage.setItem("Admin_id", Admin_id);
        localStorage.setItem("Admin_Name", admin_name);
        navigate("/AdminPage");
      } else {
        // Handle sign-in failure
        setError("Failed to sign in. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error occurred while signing in:", error);
      setError("Failed to sign in. Please try again.");
    }
  };
  useEffect(() => {
    setAnimateLogo(true);
  }, []);

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
      <div class="vertical-line h-[0.5px] w-[400px] lg:h-[400px] lg:w-0"></div>
      <div className="form">
        <div className="flex flex-col gap-4 mb-4">
          <h1 className="text-4xl font-extrabold text-center text-[#494949]">
            Welcome
          </h1>
          <p className="text-md text-center text-[#494949]">
            Please Login to Admin Dashboard
          </p>
        </div>
        <div className="inputs flex flex-col gap-4 my-3">
          <input
            type="email"
            className="p-2 placeholder-[#EE5C24] rounded-lg"
            placeholder="UserName"
            value={username}
            onChange={(e) => setusername(e.target.value)}
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

          <button
            onClick={handleSignIn}
            className="bg-[#EE5C24] text-white p-2 rounded-lg"
          >
            Sign In
          </button>
        </div>
        {error && <p className="text-red-900 text-sm">{error}</p>}
        <div className="dont-have flex flex-col gap-3 mt-6 justify-center items-center">
          <p className="text-[#494949] text-sm">
            Are you an User?{" "}
            <Link to="/UserSign" className="text-[#EE5C24] underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminSign;
