import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home gap-y-1 lg:px-8 px-4 mt-[50px] lg:mt-[30px] mb-7">
      <div className="heading">Good Morning, Omar!</div>
      <div className="statics grid grid-cols-2 gap-2 py-2 lg:grid-cols-2 gap-y-6">
        <div className="first-stat stat w-[200px] md:w-[300px] lg:w-[400px] rounded-md">
          <span>22</span>
          <span>Person in Camera 1</span>
        </div>
        <div className="second-stat stat w-[200px] md:w-[300px] lg:w-[400px] rounded-md">
          <span>22</span>
          <span>Person in Camera 1</span>
        </div>
        <div className="third-stat stat w-[200px] md:w-[300px] lg:w-[400px] rounded-md">
          <span>22</span>
          <span>Person in Camera 1</span>
        </div>
        <div className="fourth-stat stat w-[200px] md:w-[300px] lg:w-[400px] rounded-md">
          <span>22</span>
          <span>Person in Camera 1</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
