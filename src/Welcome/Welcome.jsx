import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import welcome from "../images/OURLOGObeside-02.png";
import "./Welcome.css";

function Welcome() {
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 700);
    const timer = setTimeout(() => {
      navigate("/Homepage");
    }, 2200);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`content ${fadeIn ? "fade-in" : ""}`}>
      <img src={welcome} className="w-[700px]" alt="" />
    </div>
  );
}

export default Welcome;
