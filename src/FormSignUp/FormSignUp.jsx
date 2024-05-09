import React from "react";
import "./FormSignUp.css";
function FormSignUp() {
  return (
    <div className="form-SignUp px-8 my-8 ">
      <div className="form flex flex-col bg-[#F5E1BC] rounded-lg p-4 gap-4 items-center">
        <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
          <form>
            <div className="mb-6">
              <h4 className="mb-2 text-lg font-semibold text-gray-700">
                Date of Birth
              </h4>
              <div className="flex">
                <input
                  type="text"
                  placeholder="DD"
                  className="w-1/3 px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="MM"
                  className="w-1/3 px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="YYYY"
                  className="w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mb-6">
              <h4 className="mb-2 text-lg font-semibold text-gray-700">
                Gender
              </h4>
              <div className="flex items-center">
                <input
                  id="gender-male"
                  type="radio"
                  name="gender"
                  value="male"
                  className="mr-2"
                />
                <label htmlFor="gender-male">Male</label>
                <input
                  id="gender-female"
                  type="radio"
                  name="gender"
                  value="female"
                  className="ml-6 mr-2"
                />
                <label htmlFor="gender-female">Female</label>
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
                  <input id="file-upload" type="file" className="hidden" />
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
                <input id="terms" type="checkbox" className="mr-2" />
                <label htmlFor="terms" className="text-gray-700">
                  I accept the terms and conditions for signing up to this
                  service, and hereby confirm I have read the privacy policy.
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-red-700 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormSignUp;
