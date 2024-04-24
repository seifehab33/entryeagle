import React, { useEffect, useState } from "react";
import logo from "../../images/Our logo-01.png";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { Progress, Typography } from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
function SignUp({ setIsSignedUp }) {
  const navigate = useNavigate();
  const [animateLogo, setAnimateLogo] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastname, setLname] = useState("");
  const [firstname, setFname] = useState("");
  const [UserName, setUserName] = useState("");
  const [image, setImage] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [repassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const [showFormSignUp, setShowFormSignUp] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFilling, setIsFilling] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    setAnimateLogo(true);
  }, []);

  useEffect(() => {
    setError("");
  }, [email, password]);

  const handleSignUp = () => {
    if (password !== repassword) {
      setError("Passwords don't match");
    } else {
      console.log("Passwords match. Proceed with sign up.");
      setShowFormSignUp(true);
      setProgress(50);
    }
  };
  const handleDateChange = (date) => {
    setDateOfBirth(date);
  };
  const handleFinished = () => {
    setIsSignedUp(true);
    navigate("/UserPage");
  };
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    console.log("Image uploaded:", selectedImage);
    setImage(selectedImage);
  };
  const handleTermsAgree = (e) => {
    if (e.target.checked) {
      setIsFilling(true);
      setProgress(100);
      setTermsAccepted(true);
    } else {
      setIsFilling(false);
      setProgress(50);
      setTermsAccepted(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSignUp();
    }
  };

  const handleGoBack = () => {
    setShowFormSignUp(false);
    setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSignUp();
    if (!error) {
      try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("username", UserName);
        formData.append("last_name", lastname);
        formData.append("first_name", firstname);
        formData.append(
          "birth_date",
          dateOfBirth ? dateOfBirth.toISOString().split("T")[0] : ""
        );
        formData.append("photo", image);

        const response = await axios.post(
          "http://127.0.0.1:8000/Signup/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          console.log("Data sent successfully:", response.data);
          localStorage.setItem("firstname", firstname); // Set name in localStorage
          handleFinished();
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          if (
            error.response.data.error === "Username or email already exists"
          ) {
            console.log("Username or email already exists.");
            setError("Username or email already exists.");
            setFname("");
            setLname("");
            setEmail("");
            setPassword("");
            setRePassword("");
          } else {
            console.error(
              "An error occurred with status 400:",
              error.response.data
            );
          }
        } else {
          console.error("Unexpected error:");
        }
        console.error("Error sending data:", error);
      }
    }
  };

  return (
    <div
      className="Signin flex flex-col items-center lg:h-[100vh]  px-8 gap-2
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
      {!showFormSignUp && (
        <>
          <div className="form">
            <div className="flex flex-col gap-4 mb-4">
              <h1 className="text-4xl font-extrabold text-center text-[#494949]">
                Welcome
              </h1>
              <p className="text-md text-center text-[#494949]">
                Please Sign Up to User Dashboard
              </p>
              <div className="w-full">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <Typography color="blue-gray" variant="h6">
                    Completed
                  </Typography>
                  <Typography color="blue-gray" variant="h6">
                    {progress}%
                  </Typography>
                </div>
                <Progress
                  className={
                    isFilling
                      ? "fill-progress text-[#ee5c24]"
                      : "text-[#ee5c24]"
                  }
                  value={progress}
                />
              </div>
            </div>
            <div className="inputs flex flex-col gap-4 my-3">
              <input
                type="text"
                className="p-2 placeholder-[#EE5C24] rounded-lg"
                placeholder="UserName"
                value={UserName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <input
                type="text"
                className="p-2 placeholder-[#EE5C24] rounded-lg"
                placeholder="FirstName"
                value={firstname}
                onChange={(e) => setFname(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <input
                type="text"
                className="p-2 placeholder-[#EE5C24] rounded-lg"
                placeholder="LastName"
                value={lastname}
                onChange={(e) => setLname(e.target.value)}
                onKeyDown={handleKeyDown}
              />
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
              <input
                type="password"
                className="p-2 placeholder-[#EE5C24] rounded-lg"
                placeholder="Repeat Password"
                value={repassword}
                onChange={(e) => setRePassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="bg-[#EE5C24] text-white p-2 rounded-lg flex justify-center items-center"
                onClick={handleSignUp}
              >
                Continue{" "}
                <span className="moving-svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </button>
              {error && (
                <div className="text-sm font-bold text-red-800">
                  <p>{error}</p>
                </div>
              )}{" "}
            </div>

            <div className="dont-have flex flex-col gap-3 mt-6 justify-center items-center">
              <p className="text-[#494949] text-sm">
                Already have an account?{" "}
                <Link to="/UserSign" className="text-[#EE5C24] underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </>
      )}

      {showFormSignUp && (
        <div className="form-SignUp px-8 my-8 ">
          <div className="form flex flex-col bg-[#F5E1BC] rounded-lg p-4 gap-4 items-center ">
            <div className="w-full">
              <div className="mb-2 flex items-center justify-between gap-4">
                <Typography color="blue-gray" variant="h6">
                  Completed
                </Typography>
                <Typography color="#f7982c" variant="h6">
                  {progress}%
                </Typography>
              </div>
              <Progress
                className={isFilling ? "fill-progress" : ""}
                value={progress}
              />
            </div>
            <h1 className="font-bold text-xl">Complete Your Profile!</h1>
            <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <h4 className="mb-2 text-lg font-semibold text-gray-700">
                    Date of Birth
                  </h4>
                  <div className="flex">
                    <DatePicker
                      selected={dateOfBirth}
                      onChange={handleDateChange}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="YYYY-MM-DD"
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={100}
                      className="w-full px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="mb-2 text-lg font-semibold text-gray-700">
                    Insert Profile Image
                  </h4>
                  <div className="flex items-center mb-4">
                    <label
                      htmlFor="file-upload"
                      className="flex items-center cursor-pointer"
                    >
                      <span className="mr-2 text-gray-500">Choose File:</span>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleImageChange}
                      />

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </label>
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="mb-2 text-lg font-semibold text-gray-700">
                    Terms and Conditions
                  </h4>
                  <div className="flex items-center">
                    <input
                      id="terms"
                      type="checkbox"
                      className="mr-2"
                      onClick={handleTermsAgree}
                    />
                    <label htmlFor="terms" className="text-gray-700">
                      I accept the terms and conditions for signing up to this
                      service, and hereby confirm I have read the privacy
                      policy.
                    </label>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-red-700 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
                    disabled={!termsAccepted}
                  >
                    Sign Up
                  </button>
                </div>
                <div className="flex justify-between mt-10 items-center">
                  {error && (
                    <>
                      <div className="text-sm font-bold text-red-800">
                        <p>{error}</p>
                        <button
                          className="px-6 py-2 bg-red-700 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
                          onClick={handleGoBack}
                        >
                          Go Back
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
