import React from "react";
import team from "../../images/The Team.jpeg";
import "./About.css";
function AboutUs() {
  return (
    <>
      <div className=" py-[30px] px-8 about">
        <div className="flex flex-col  animate-from-top">
          <h1 className="font-bold text-5xl tracking-[3px] ">
            Survillience Tracking{" "}
            <span className="text-[#ee5c24]">Service</span>
          </h1>
          <p className="py-2 text-[18px] lg:text-center ">
            Let's Secure Your Place Right Now
          </p>
        </div>
      </div>
      <div className="Who bg-black  px-8 text-white flex flex-col lg:flex-row py-4 justify-around items-center gap-4 h-full">
        <div className="flex px-8  flex-col flex-wrap gap-2 animate-left-to-right">
          <p className="text-5xl text-center lg:text-start text-[#ee5c24] font-bold tracking-wide">
            Our Story
          </p>
          <p className="flex  text-justify  lg:w-[700px] capitalize ">
            Welcome to our story, where safety and security take center stage in
            the bustling world of campus life. In the midst of this vibrant
            environment, a pressing need arose to enhance the protection of
            individuals and their loved ones. Recognizing this challenge, a
            dedicated team embarked on a journey to create a solution that would
            revolutionize campus safety. Thus, the Intelligent Campus Community
            Monitoring and Tracking System was born, driven by the goal of
            providing a reliable and efficient way to keep track of family
            members and friends in such dynamic settings. Join us as we delve
            into the tale of innovation, empowerment, and the commitment to
            ensure the well-being of every member of our campus community.
            Welcome to our story—a testament to the power of collaboration and
            the pursuit of safer, more secure environments for all.
          </p>
          <hr className="hr-1" />
        </div>
        <div className="animate-right-to-left">
          <img src={team} alt="" className="w-[500px]  " />
        </div>
      </div>
    </>
  );
}

export default AboutUs;
