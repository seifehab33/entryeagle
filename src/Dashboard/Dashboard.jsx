import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Dashboard.css";

function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchText, setSearchText] = useState("");
  const [userTable, setuserTable] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [camera_index, setcameraindex] = useState(0);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  useEffect(() => {
    const fetchCameraList = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cameras");
        setCameras(response.data);
      } catch (error) {
        console.error("Error fetching camera list:", error); // Log the error to console
        setSpinnerVisible(true); // Show the spinner on error
      }
    };
    fetchCameraList();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/camera-history/"
        );
        setuserTable(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredUserData = userTable.filter((user) =>
    user.person.toLowerCase().includes(searchText.toLowerCase())
  );

  const calculateTotalUsers = () => {
    return filteredUserData.length;
  };

  const calculateDuration = (startDateTime, endDateTime) => {
    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);

    // Check if parsing resulted in valid dates
    if (isNaN(startDate) || isNaN(endDate)) {
      return null; // Return null if either date is invalid
    }

    // Calculate duration in milliseconds
    const durationMs = endDate - startDate;

    // Convert duration to hours
    const durationHours = durationMs / (1000 * 60 * 60);

    return durationHours;
  };
  const duration = calculateDuration(
    userTable.checkIn_time,
    userTable.checkOut_time
  );

  return (
    <div className="flex flex-col py-3 px-8 gap-6 lg:flex-row ">
      {/* Dashboard content */}
      <div className="dashboard md:w-3/4  py-5 flex flex-col gap-6 order-2">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Users"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border rounded-md px-2 py-1 w-full"
          />
        </div>
        <div className="camera-location flex flex-col md:flex-row gap-8">
          <div className="location flex flex-col gap-3">
            <span className="font-medium text-base text-location">
              Location
            </span>
            <select
              name="location"
              id="location"
              className="options px-2 rounded-md"
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="camera flex flex-col gap-3">
            <span className="font-medium text-base">Camera</span>
            <select
              name="camera"
              id="camera"
              className="options px-2 rounded-md"
              value={camera_index}
              onChange={(e) => {
                setcameraindex(parseInt(e.target.value));
              }}
            >
              <option value={0}>1</option>
              <option value={1}>2</option>
            </select>
            <p>{cameras}</p>
            <p>{camera_index}</p>
          </div>
        </div>
        {cameras.map((cameraId, index) => (
          <div className="camera-view" key={index}>
            <h2>Camera {camera_index}</h2>
            <img
              src={`http://localhost:5000/video_feed/${camera_index}`}
              alt={`Camera Feed ${cameraId}`}
              style={{ width: "60%" }}
              onError={(e) => {
                e.target.style.display = "none"; // Hide the image on error
                setSpinnerVisible(true); // Show the spinner on error
              }}
              onLoad={() => {
                setSpinnerVisible(false); // Hide the spinner when the image loads
              }}
            />
          </div>
        ))}
        {spinnerVisible && (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full border-t-4 border-gray-200 h-20 w-20"></div>
          </div>
        )}
        <div className="">
          <table className="border-none table-camera w-full md:max-w-[920px] rounded-sm">
            <thead>
              <tr>
                <th>Users</th>
                <th>Camera</th>
                <th>Check-in Time</th>
                <th>Checkout Time</th>
                <th className="text-center">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredUserData.map((data, index) => (
                <React.Fragment key={index}>
                  <tr className="row-with-padding">
                    <td className="text-center capitalize">{data.person}</td>
                    <td className="text-center">{data.camera}</td>
                    <td className="text-center">{data.checkIn_time}</td>
                    <td className="text-center">{data.checkOut_time}</td>
                    <td className="flex items-center justify-center">
                      <button className="view-button w-[5em] h-8 rounded-xl">
                        View
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5">
                      <hr />
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="calendar flex justify-center lg:w-1/3 order-1  lg:flex-1 lg:block lg:order-2 lg:mt-[100px] ">
        <Calendar
          onChange={handleDateChange} // Handle date change event
          value={selectedDate} // Set selected date
        />
        <div className="stats-card flex gap-4 my-[30px]">
          <div className=" bg-[#e48d29] rounded-lg shadow-md flex flex-col p-2">
            <div className="text-white ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
            </div>
            <p className="text-sm text-white mt-2">Total Users</p>
            <p className="text-lg font-semibold">{calculateTotalUsers()}</p>
          </div>
          <div className=" bg-[#ee5c24] rounded-lg shadow-md flex flex-col p-2 ">
            <div className="text-white text-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <p className="text-sm text-white mt-2">Average Check-In Duration</p>
            <p className="text-lg font-semibold">
              {duration !== null ? (
                <p>{duration.toFixed(1)} hours</p>
              ) : (
                <p>Invalid date</p>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
