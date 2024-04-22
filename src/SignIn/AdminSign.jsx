// SignIn.js
import React, { useEffect, useState } from "react";
import logo from "../images/Our logo-01.png";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";
function AdminSign({ onSignIn }) {
  const navigate = useNavigate();
  const [animateLogo, setAnimateLogo] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setAnimateLogo(true);
  }, []);
  const handleSignIn = () => {
    if (email === "admin@gmail.com" && password === "123456789") {
      onSignIn(email, password);
      navigate("/AdminPage");
    } else {
      setError("Invalid email or password");
    }
  };
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
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        {error && <p>{error}</p>}
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
