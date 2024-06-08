import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function UserDetails() {
  const { id } = useParams();
  const [personDetails, setPersonDetails] = useState([]);
  const [LastpersonDetails, setLastPersonDetails] = useState([]);
  const [personCard, setPersonCardInfo] = useState(null);
  const CommunityId = localStorage.getItem("CommunityId");
  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        const response = await axios.get(
          `https://web-production-22c55.up.railway.app/persons/${id}/`
        );

        setPersonCardInfo(response.data);
      } catch (error) {
        console.error("Error fetching person details:", error);
      }
    };

    fetchPersonDetails();
  }, [id]);
  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        const response = await axios.get(
          `https://web-production-22c55.up.railway.app/camera-history/${id}/`
        );
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          setLastPersonDetails(data[data.length - 1]); // Set to the last item in the array
        }
        if (response.data.length > 0) {
          setLastPersonDetails(response.data[response.data.length - 1]);
        }
        setPersonDetails(response.data);
      } catch (error) {
        console.error("Error fetching person details:", error);
      }
    };

    fetchPersonDetails();
  }, [id]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Adjust formatting as needed
  };
  return (
    <div className="px-8 my-[10px] flex flex-col gap-[2em]">
      {personCard ? (
        <div className="p-4 flex bg-[#FAF0DD] items-center gap-[20px] rounded-xl">
          <div className="">
            <img
              src={`https://web-production-22c55.up.railway.app${personCard.photo_url}`} // Prepend the base URL to the photo_url
              alt=""
              className="w-[250px] lg:w-[250px] rounded-lg shadow-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 gap-x-[20px]  lg:absolute left-[40%]">
            <p className="text-[15px] font-semibold text-gray-700 mb-3">
              <span className="text-[#EE5C24]">FirstName:</span>{" "}
              {personCard.first_name}
            </p>
            <p className="text-[15px] font-semibold text-gray-700 mb-3">
              <span className="text-[#EE5C24]">LastName:</span>{" "}
              {personCard.last_name}
            </p>
            <p className="text-[15px] font-semibold text-gray-700 mb-3">
              <span className="text-[#EE5C24]">Email:</span> {personCard.email}
            </p>
            <p className="text-[15px] font-semibold text-gray-700 mb-3">
              <span className="text-[#EE5C24]">Birthdate:</span>{" "}
              {personCard.birth_date}
            </p>

            <p className="text-[15px] font-semibold text-gray-700 mb-3">
              <span className="text-[#EE5C24]">Community Id:</span>{" "}
              {CommunityId}
            </p>
            <p className="text-[15px] font-semibold text-gray-700 mb-3">
              <span className="text-[#EE5C24]">Created_at:</span>{" "}
              {formatDate(personCard.created_at)}
            </p>
            <p className="text-[15px] font-semibold text-gray-700 mb-3">
              <span className="text-[#EE5C24]">Last_seen: </span>{" "}
              {LastpersonDetails ? (
                <span>
                  {formatDate(LastpersonDetails.checkOut_time)},
                  {LastpersonDetails.camera}
                </span>
              ) : (
                "N/A"
              )}
            </p>
          </div>
        </div>
      ) : (
        <p>User not found</p>
      )}
      <div className="">
        <table className="table-auto w-full bg-[#FAF0DD] rounded-xl ">
          <thead className="border-b-[2px] border-[#EE5C24] ">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Check-In Time</th>
              <th className="px-4 py-2">Check-Out Time</th>
              <th className="px-4 py-2">Camera</th>
            </tr>
          </thead>
          <tbody>
            {/* Example data row, replace it with your actual data */}

            {personDetails.map((row, id) => (
              <tr key={id}>
                <td className="px-4 py-2 text-center">{row.person_id}</td>
                {/* <td className="px-4 py-2 text-center">{row.date}</td> */}
                <td className="px-4 py-2 text-center">
                  {" "}
                  {formatDate(row.checkIn_time)}
                </td>
                <td className="px-4 py-2 text-center">
                  {" "}
                  {formatDate(row.checkOut_time)}
                </td>
                {/* <td className="px-4 py-2 text-center">{row.location}</td> */}
                <td className="px-4 py-2 text-center">{row.camera}</td>
              </tr>
            ))}
            {/* Add more rows with your actual data */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserDetails;
