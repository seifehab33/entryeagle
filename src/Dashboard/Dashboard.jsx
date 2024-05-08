/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";

function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchText, setSearchText] = useState("");
  const [userTable, setuserTable] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [camera_index, setCameraIndex] = useState(0);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [averageCheckInDuration, setAverageCheckInDuration] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchCameraList = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cameras");
        setCameras(response.data);
      } catch (error) {
        console.error("Error fetching camera list:", error);
      }
    };

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

    fetchCameraList();
    fetchData();
  }, []);
  // useEffect(() => {
  //   const cameraHistorySocket = new WebSocket(
  //     "ws://localhost:8000/ws/camera-history/"
  //   );

  //   cameraHistorySocket.onopen = () => {
  //     console.log("WebSocket connected");
  //   };

  //   cameraHistorySocket.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     setuserTable(data);
  //   };

  //   return () => {
  //     cameraHistorySocket.close();
  //   };
  // }, []);
  // useEffect(() => {
  //   const fetchCameraList = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/cameras");
  //       setCameras(response.data);
  //     } catch (error) {
  //       console.error("Error fetching camera list:", error);
  //     }
  //   };

  //   fetchCameraList();
  // }, []);
  useEffect(() => {
    // Calculate average check-in duration whenever userTable changes
    if (userTable.length > 0) {
      const totalDuration = userTable.reduce((acc, data) => {
        const duration = calculateDuration(data.checkIn_time);
        return acc + duration;
      }, 0);
      const average = totalDuration / userTable.length;
      setAverageCheckInDuration((average / 60).toFixed(1)); // Round to 1 decimal place
    } else {
      setAverageCheckInDuration(0);
    }
  }, [userTable]);

  const filteredUserData = userTable.filter((user) =>
    user.person.toLowerCase().includes(searchText.toLowerCase())
  );
  const totalPages = Math.ceil(filteredUserData.length / itemsPerPage);

  // Get current items
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUserData.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const calculateTotalUsers = () => filteredUserData.length;

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(dateString);
    return date.toLocaleString(undefined, options);
  };

  const calculateDuration = (dateTime) => {
    const time = new Date(dateTime);

    if (isNaN(time.getTime())) {
      return 0; // If invalid time, return 0 minutes
    }

    // Extract hours and minutes
    const hour = time.getHours();
    const minute = time.getMinutes();

    // Convert time to minutes
    const totalMinutes = hour * 60 + minute;

    return totalMinutes;
  };

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
                setCameraIndex(parseInt(e.target.value));
              }}
            >
              <option value={0}>1</option>
              <option value={1}>2</option>
            </select>
            <p>{cameras}</p>
          </div>
        </div>
        <div className="camera-view">
          <h2>Camera {camera_index}</h2>
          <img
            src={`http://localhost:5000/video_feed/${camera_index}`}
            // alt={`Camera Feed ${cameraId}`}
            style={{ width: "40%" }}
            onError={(e) => {
              e.target.style.display = "none"; // Hide the image on error
              setSpinnerVisible(true); // Show the spinner on error
            }}
            onLoad={() => {
              setSpinnerVisible(false); // Hide the spinner when the image loads
            }}
          />
        </div>

        {spinnerVisible && (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full border-t-4 border-black h-20 w-20"></div>
          </div>
        )}
        <div className="">
          <table className="border-none table-camera rounded-md w-full md:max-w-[920px] ">
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
              {currentUsers.map((data, index) => (
                <React.Fragment key={index}>
                  <tr className="row-with-padding">
                    <td className="text-center capitalize">{data.person}</td>
                    <td className="text-center">{data.camera}</td>
                    <td className="text-center">
                      {formatDate(data.checkIn_time)}
                    </td>
                    <td className="text-center">
                      {formatDate(data.checkOut_time)}
                    </td>
                    <td className="flex items-center justify-center">
                      <Link
                        to={{
                          pathname: `/ProfileDetails/${data.person_id}`,
                          // Pass the users array as state
                        }}
                      >
                        <button className="view-button w-[5em] h-8 rounded-xl">
                          View
                        </button>
                      </Link>
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
          <div className="flex items-center justify-between border-t border-blue-gray-50 py-4 w-full md:max-w-[920px]">
            <div>
              <Typography variant="small" className="font-normal text-gray-900">
                Page {currentPage} of {totalPages}
              </Typography>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outlined"
                size="sm"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-[#EE5C24] border-[#ee5c24]"
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                size="sm"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-[#ee5c24] border-[#ee5c24]"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="calendar flex justify-center lg:w-1/3 order-1  lg:flex-1 lg:block lg:order-2 lg:mt-[100px] ">
        <Calendar value={selectedDate} />
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
            <p className="text-sm text-white mt-2">Total Checked In Users</p>
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
                  d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
            <p className="text-sm text-white mt-2">Number of Cameras</p>
            <p className="text-lg font-semibold">
              <p>
                {" "}
                <p>{cameras.length}</p>
              </p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
