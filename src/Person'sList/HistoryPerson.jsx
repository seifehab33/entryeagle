import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Button } from "@material-tailwind/react";
import unkown from "../images/person.jpg";

function HistoryPerson() {
  const { id } = useParams();
  const [personData, setPersonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change this value to adjust items per page
  useEffect(() => {
    // Define an async function inside the useEffect
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://web-production-22c55.up.railway.app/persons/${id}/`
        );
        setUser(response.data);
      } catch (error) {
        setError("Failed to fetch user data");
        console.error(error);
      }
    };

    // Call the async function
    fetchUser();
  }, [id]);

  useEffect(() => {
    const fetchPersonData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `	https://web-production-22c55.up.railway.app/camera-history/${id}/`
        );
        const reversedData = response.data.reverse(); // Reverse the data array

        setPersonData(reversedData);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchPersonData();
  }, [id]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = personData.slice(indexOfFirstItem, indexOfLastItem);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC",
    };
    return date.toLocaleString(undefined, options); // Adjust formatting as needed
  };
  const formatFULLDATE = (dateString) => {
    const date = new Date(dateString);
    const options = {
      hour: "numeric",
      minute: "numeric",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour12: true,
      timeZone: "UTC",
    };
    return date.toLocaleString(undefined, options); // Adjust formatting as needed
  };
  const formatDateOnly = (dateString) => {
    const date = new Date(dateString);
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    };
    return date.toLocaleString(undefined, options); // Adjust formatting as needed
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!personData.length) return <div>No history found</div>;

  return (
    <>
      {user ? (
        <div className="px-8 mt-[10px] flex flex-col gap-[2em]">
          <div className="p-4 flex bg-[#FAF0DD] items-center gap-[20px] rounded-xl">
            <div className="">
              <img
                src={
                  user.photo_url
                    ? `https://web-production-22c55.up.railway.app${user.photo_url}`
                    : unkown
                }
                alt=""
                className="h-[300px] w-[300px] rounded-full   transition duration-300 ease-in-out transform hover:scale-105 object-cover object-center"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 gap-x-[20px]  lg:absolute left-[40%]">
              <p className="text-[15px] font-semibold text-gray-700 mb-3">
                <span className="text-[#EE5C24]">FirstName:</span>{" "}
                {user.first_name}
              </p>
              <p className="text-[15px] font-semibold text-gray-700 mb-3">
                <span className="text-[#EE5C24]">LastName:</span>{" "}
                {user.last_name}
              </p>
              <p className="text-[15px] font-semibold text-gray-700 mb-3">
                <span className="text-[#EE5C24]">Email:</span> {user.email}
              </p>
              <p className="text-[15px] font-semibold text-gray-700 mb-3">
                <span className="text-[#EE5C24]">Birthdate:</span>{" "}
                {user.birth_date}
              </p>
              {/* <p className="text-[15px] font-semibold text-gray-700 mb-3">
                <span className="text-[#EE5C24]">Community Id:</span>{" "}
                {user.Community_ID}
              </p> */}
              <p className="text-[15px] font-semibold text-gray-700 mb-3">
                <span className="text-[#EE5C24]">Community Id:</span>{" "}
                {user.Community_IDs && (
                  <span>
                    <span>{user.Community_IDs.join(", ")}</span>
                  </span>
                )}
              </p>
              <p className="text-[15px] font-semibold text-gray-700 mb-3">
                <span className="text-[#EE5C24]">Created at:</span>{" "}
                {formatFULLDATE(user.created_at)}
              </p>
            </div>
          </div>

          {/* Table with pagination */}
          <div className="relative flex flex-col gap-3 ">
            <table className="table-auto w-full bg-[#FAF0DD] rounded-xl">
              <thead className="border-b-[2px] border-[#EE5C24] ">
                <tr>
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2">Check-In</th>
                  <th className="px-4 py-2">Check-Out</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Camera</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((entry, index) => (
                  <tr key={index}>
                    <td className="text-center">{index}</td>
                    <td className="text-center">
                      {formatDate(entry.checkIn_time)}
                    </td>
                    <td className="text-center">
                      {formatDate(entry.checkOut_time)}
                    </td>
                    <td className="text-center">
                      {formatDateOnly(entry.checkIn_time)}
                    </td>
                    <td className="text-center">{entry.camera}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <div>
                <Typography
                  variant="small"
                  className="font-normal text-gray-900"
                >
                  Page {currentPage} of{" "}
                  {Math.ceil(personData.length / itemsPerPage)}
                </Typography>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1 || !personData.length}
                  className="text-[#EE5C24] border-[#ee5c24]"
                >
                  Previous
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  className="text-[#ee5c24] border-[#ee5c24]"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={indexOfLastItem >= personData.length}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full border-t-4 border-black h-20 w-20"></div>
        </div>
      )}
    </>
  );
}

export default HistoryPerson;
