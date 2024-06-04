import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import imgheader from "../assets/img/camera-header.jpg";
import imgabout from "../assets/img/cctv-camera-about.jpg";
import ezz from "../assets/img/Ezz.jpeg";
import mahmoud from "../assets/img/mahmoud.jpeg";
import seif from "../assets/img/WhatsApp Image 2024-04-24 at 2.53.25 AM.jpeg";
import hanfy from "../assets/img/hanfy.jpeg";
import nour from "../assets/img/nour.jpeg";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "swiper/css";
import "swiper/css/pagination";

import { Navigation, Autoplay } from "swiper/modules";

const Main = () => {
  const [isVisible, setIsVisible] = useState(false);

  const images = [
    { name: "Ezz El-Sadaty", src: ezz },
    { name: "Mahmoud Kassem ", src: mahmoud },
    { name: "Seif Ehab", src: seif },
    { name: "Omar El-Hanfy", src: hanfy },
    { name: "Nour El-Houda", src: nour },
  ];
  const services = [
    {
      title: "User-Friendly Interface",
      icon: "🖥️",
      description:
        "Our system features a user-friendly interface designed for ease of use, allowing seamless navigation and operation for all users.",
    },
    {
      title: "Real-Time Tracking and Monitoring",
      icon: "⏱️",
      description:
        "Utilizing the latest advancements in surveillance technology, our system offers real-time tracking and monitoring of community members, ensuring immediate and accurate updates.",
    },
    {
      title: "Peace of Mind for Families",
      icon: "👨‍👩‍👧‍👦",
      description:
        "Providing peace of mind for families by allowing them to keep track of their loved ones in densely populated areas, ensuring their safety and security.",
    },
    {
      title: "Facial Recognition",
      icon: "🔍",
      description:
        "Advanced facial recognition technology integrated into our surveillance system enables precise identification and tracking of individuals within the monitored area.",
    },
    {
      title: "Privacy and Data Security",
      icon: "🔒",
      description:
        "Developed with stringent privacy and data security measures, our system ensures ethical usage and protection of personal information, maintaining user confidentiality.",
    },
    {
      title: "Enhanced Safety",
      icon: "🛡️",
      description:
        "Our system enhances overall safety in public spaces by integrating advanced surveillance and monitoring solutions, providing a secure environment for all users.",
    },
  ];
  const [expandedServiceIndex, setExpandedServiceIndex] = useState(null);
  const toggleReadMore = (index) => {
    setExpandedServiceIndex(expandedServiceIndex === index ? null : index);
  };
  const serviceSectionRef = useRef(null);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const handleScrollToService = () => {
    if (serviceSectionRef.current) {
      serviceSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const aboutVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };
  const sectionVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const useScrollAnimation = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
      if (inView) {
        controls.start("animate");
      }
    }, [controls, inView]);

    return { ref, controls };
  };

  const headerAnimation = useScrollAnimation();
  const aboutAnimation = useScrollAnimation();
  const servicesAnimation = useScrollAnimation();
  const teamAnimation = useScrollAnimation();
  return (
    <>
      <motion.section
        className="header-entry"
        id="home"
        variants={sectionVariants}
        initial="initial"
        animate={headerAnimation.controls}
        ref={headerAnimation.ref}
      >
        <div className="relative flex items-center px-8 justify-center h-screen bg-black">
          <img
            src={imgheader}
            alt="Security Cameras"
            className="absolute inset-0 object-cover w-full h-full opacity-50"
          />
          <div className="relative text-center text-white">
            <h1 className="text-xl md:text-4xl font-bold text-white">
              The Intelligent Campus Monitoring and Tracking System
            </h1>
            <p className="mt-4 text-xl md:text-2xl">Best Security Services</p>
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
              <button
                className="px-6 py-2 text-lg font-semibold text-[#ee5c24] bg-white rounded transition duration-300 ease-in-out hover:text-white hover:bg-[#ee5c24] hover:border-none focus:outline-none"
                onClick={handleScrollToService}
              >
                <a href="#service">Explore</a>
              </button>
            </div>
          </div>
        </div>
      </motion.section>
      <div
        className={`fixed bottom-5 right-5 z-50 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {isVisible && (
          <button
            onClick={scrollToTop}
            className={
              "bg-[#ee5c24] hover:bg-white hover:text-[#ee5c24] text-white font-bold py-2 px-4 rounded-full shadow-lg   transform transition-transform duration-300 animate-bounce "
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              />
            </svg>
          </button>
        )}
      </div>
      <motion.section
        className="about-main"
        id="about"
        variants={aboutVariants}
        initial="initial"
        animate={aboutAnimation.controls}
        ref={aboutAnimation.ref}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="md:w-1/2 lg:w-1/3">
              <img
                src={imgabout}
                alt="CCTV Cameras"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-6">
              <div className="mb-6 text-justify">
                <p className="text-3xl mb-2 uppercase text-[#ee5c24]">
                  About Us
                </p>
                <h2 className="text-2xl font-bold text-black mb-2">
                  Intelligent Campus Monitoring and Tracking System
                </h2>
                <p className="text-gray-600 mb-4">
                  The Intelligent Campus Community Monitoring and Tracking
                  System offers a cutting-edge solution for keeping track of
                  relatives and community members in densely populated areas.
                  Utilizing the latest advancements in surveillance technology,
                  the system provides real-time tracking and monitoring through
                  a network of interconnected cameras with advanced facial
                  recognition. This ensures families can easily track their
                  loved ones and enhances security in public spaces like
                  shopping malls and parks. Designed with a user-friendly
                  interface and robust privacy measures, the system guarantees
                  safety and peace of mind while protecting personal
                  information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="services"
        id="service"
        variants={sectionVariants}
        initial="initial"
        animate={servicesAnimation.controls}
        ref={(element) => {
          servicesAnimation.ref(element);
          serviceSectionRef.current = element;
        }}
      >
        <div className="bg-white p-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl text-[#ee5c24]">Our Main Points</h2>
            <h1 className="text-2xl font-bold text-black">
              Intelligent Campus Monitoring and Tracking System Services
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-start">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-[#f5e1bcb4] p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-x-2"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-[#ee5c24] mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {expandedServiceIndex === index
                    ? service.description
                    : `${service.description.substring(0, 100)}...`}
                </p>
                <button
                  onClick={() => toggleReadMore(index)}
                  className="text-black font-bold hover:underline"
                >
                  {expandedServiceIndex === index ? "Read Less" : "Read More"}{" "}
                  &rarr;
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
      <motion.section>
        <div className="flex flex-col items-center justify-center bg-gradient-to-r from-white via-white-10% to-[#f8ead0] py-5 font-jost">
          <div className="heading mb-20 text-center">
            <h1 className="text-3xl font-bold text-[#ee5c24] tracking-wide">
              Campuses For Survillience
            </h1>
            <p className="font-extralight text-gray-800 text-[17px]">
              This timeline visually represents potential surveillance locations
            </p>
          </div>
          <div className="relative w-full max-w-4xl px-4">
            {/* Vertical line in the middle */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-[#ee5c24] via-black-500 to-[#f7982c] h-full">
              {/* Circle */}
              <div className="absolute top-0 -left-2 w-5 h-5 bg-gradient-to-b from-[#ee5c24]  to-[#f7982c] rounded-full"></div>
              <div className="absolute top-[20%] -left-2 w-5 h-5 bg-gradient-to-b from-[#ee5c24]  to-[#f7982c] rounded-full"></div>
              <div className="absolute top-[40%] -left-2 w-5 h-5 bg-gradient-to-b from-[#ee5c24]  to-[#f7982c] rounded-full"></div>
              <div className="absolute top-[60%] -left-2 w-5 h-5 bg-gradient-to-b from-[#ee5c24]  to-[#f7982c] rounded-full"></div>
              <div className="absolute top-[80%] -left-2 w-5 h-5 bg-gradient-to-b from-[#ee5c24]  to-[#f7982c] rounded-full"></div>
            </div>

            {/* Timeline contents */}
            <div className="flex flex-col">
              {/* First Item on the Left */}
              <div className="flex flex-row items-center mb-10">
                <div className="w-1/2 pr-8">
                  <div className="w-full py-6 px-8 bg-gray-800 text-white rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-center">
                      Univeristy
                    </h2>
                  </div>
                </div>
                <div className="w-1/2"></div>
              </div>

              {/* Second Item on the Right */}
              <div className="flex flex-row items-center mb-10">
                <div className="w-1/2"></div>
                <div className="w-1/2 pl-8">
                  <div className="w-full py-6 px-8 bg-gray-800 text-white rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-center">Office</h2>
                  </div>
                </div>
              </div>

              {/* Third Item on the Left */}
              <div className="flex flex-row items-center mb-10">
                <div className="w-1/2 pr-8">
                  <div className="w-full py-6 px-8 bg-gray-800 text-white rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-center">Home</h2>
                  </div>
                </div>
                <div className="w-1/2"></div>
              </div>
              <div className="flex flex-row items-center mb-10">
                <div className="w-1/2"></div>
                <div className="w-1/2 pl-8">
                  <div className="w-full py-6 px-8 bg-gray-800 text-white rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-center">Malls</h2>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center mb-10">
                <div className="w-1/2 pr-8">
                  <div className="w-full py-6 px-8 bg-gray-800 text-white rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-center">Events</h2>
                  </div>
                </div>
                <div className="w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      <motion.section
        id="team"
        variants={sectionVariants}
        initial="initial"
        animate={teamAnimation.controls}
        ref={teamAnimation.ref}
      >
        <div className=" p-6 lg:p-12 bg-gradient-to-l from-white via-white-10% to-[#f8ead0] text-black">
          <div className=" text-[#ee5c24] text-center mb-5">
            <p className="text-5xl">Our Team</p>
          </div>
          <Swiper
            spaceBetween={30}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            navigation
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-[740px]">
                  <img
                    src={image.src}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-2 text-3xl text-center">
                    {image.name}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="initial"
        animate="animate"
        className="contact-main"
        id="contact"
      >
        <div className="relative flex flex-col items-center p-6 lg:p-12 bg-white text-black">
          <div className="relative z-10 w-full max-w-4xl">
            <h2 className="text-4xl font-bold text-gray-900 mb-2 text-center">
              Say <span className="text-black">Hello</span>
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Presenting a cutting-edge solution for keeping track of relatives
              and community members in densely populated areas. Utilizing the
              latest advancements in surveillance technology, our system employs
              a network of interconnected cameras equipped with facial
              recognition to enable real-time location tracking.
            </p>
            <form className="space-y-6">
              <div className="flex space-x-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ee5c24]"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ee5c24]"
                />
              </div>
              <textarea
                placeholder="Message"
                className="w-full p-3 placeholder:text-[#ee5c24] placeholder:opacity-40 h-40 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ee5c24]"
              ></textarea>
              <button
                type="submit"
                className="w-full py-3 bg-black text-white font-bold rounded-md hover:bg-gray-800 transition-colors duration-300"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </motion.section>
      <section className="mail-contact ">
        <div className="flex justify-between items-center p-4 bg-gray-900 gap-2">
          <div className="relative w-full max-w-md">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3  border-gray-300 rounded-l-md focus:outline-none"
            />
            <button
              type="submit"
              className="absolute top-0 right-0 px-6 py-3 bg-[#ee5c24] text-white font-bold  hover:bg-[#d1491f] transition-colors duration-300"
            >
              Sign Up
            </button>
          </div>
          <div className="flex gap-3">
            <a href="#sa" className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.414c0-3.1 1.892-4.788 4.658-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.917.001c-1.504 0-1.794.715-1.794 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.324V1.325C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a href="#sa" className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c-5.421 0-9.837 4.417-9.837 9.837 0 5.421 4.417 9.837 9.837 9.837s9.837-4.417 9.837-9.837c0-5.421-4.417-9.837-9.837-9.837zM12 17.888c-3.264 0-5.888-2.624-5.888-5.888s2.624-5.888 5.888-5.888 5.888 2.624 5.888 5.888-2.624 5.888-5.888 5.888zM16.114 8.71c-.394-.394-.925-.612-1.485-.612s-1.091.218-1.485.612c-.394.394-.612.925-.612 1.485s.218 1.091.612 1.485c.394.394.925.612 1.485.612s1.091-.218 1.485-.612c.394-.394.612-.925.612-1.485s-.218-1.091-.612-1.485zM12 8.925c-1.688 0-3.062 1.374-3.062 3.062s1.374 3.062 3.062 3.062 3.062-1.374 3.062-3.062-1.374-3.062-3.062-3.062zM9.788 7.67c-.394-.394-.925-.612-1.485-.612s-1.091.218-1.485.612c-.394.394-.612.925-.612 1.485s.218 1.091.612 1.485c.394.394.925.612 1.485.612s1.091-.218 1.485-.612c.394-.394.612-.925.612-1.485s-.218-1.091-.612-1.485z" />
              </svg>
            </a>
            <a href="#sa" className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.556c-.883.392-1.833.656-2.828.775 1.016-.609 1.797-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.194-.896-.954-2.173-1.548-3.591-1.548-2.717 0-4.915 2.198-4.915 4.917 0 .385.044.76.128 1.123-4.083-.205-7.702-2.159-10.125-5.133-.423.729-.666 1.574-.666 2.476 0 1.708.869 3.213 2.191 4.096-.806-.025-1.565-.248-2.228-.617v.062c0 2.385 1.693 4.374 3.946 4.827-.413.113-.849.174-1.296.174-.317 0-.625-.03-.927-.086.626 1.956 2.444 3.379 4.604 3.42-1.684 1.32-3.808 2.106-6.112 2.106-.397 0-.788-.023-1.175-.067 2.179 1.397 4.768 2.212 7.548 2.212 9.057 0 14.009-7.509 14.009-14.01 0-.213-.005-.426-.014-.637.961-.695 1.797-1.562 2.457-2.548l-.047-.02z" />
              </svg>
            </a>
            <a href="#sa" className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.947 8.305c-.507.225-1.052.375-1.622.44.583-.349 1.031-.901 1.243-1.56-.546.324-1.152.558-1.796.683-.515-.55-1.249-.896-2.062-.896-1.561 0-2.826 1.265-2.826 2.825 0 .222.025.437.073.644-2.351-.118-4.437-1.243-5.83-2.954-.243.417-.383.9-.383 1.417 0 .978.497 1.841 1.253 2.348-.461-.015-.895-.142-1.274-.354v.036c0 1.367.974 2.506 2.266 2.763-.237.064-.486.099-.743.099-.182 0-.358-.018-.53-.051.358 1.118 1.396 1.933 2.623 1.956-1.017.798-2.299 1.274-3.692 1.274-.239 0-.475-.014-.708-.041 1.317.845 2.882 1.337 4.565 1.337 5.476 0 8.471-4.535 8.471-8.471 0-.065 0-.129-.001-.193.581-.419 1.083-.939 1.48-1.534l-.03-.013z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      <footer className="w-full bg-[#ee5c24] text-white py-2">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-sm">© EntryEagle. All Rights Reserved.</p>
          <p className="text-sm">
            Designed by{" "}
            <a href="#sa" className="underline">
              EntryEagle
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Main;
