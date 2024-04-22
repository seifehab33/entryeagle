import React from "react";
import { useParams } from "react-router-dom";
import { Users } from "./UserContext";

function UserDetails() {
  const { id } = useParams();
  const user = Users.find((user) => user.id === parseInt(id)); // Filter the user by id

  return (
    <div className="px-8 mt-[10px] flex flex-col gap-[2em]">
      {user ? (
        <div className="p-4 flex bg-[#FAF0DD] items-center gap-[20px] rounded-xl">
          <div className="">
            <img
              src={user.imgSrc}
              alt=""
              className="w-[300px] lg:w-[400px] rounded-lg shadow-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 gap-x-[20px]  lg:absolute left-[40%]">
            <p className="text-[15px] font-semibold text-gray-700 mb-3">
              <span className="text-[#EE5C24]">Name:</span> {user.name}
            </p>
            <p className="text-[15px] font-semibold text-gray-700 mb-3">
              <span className="text-[#EE5C24]">Email:</span> {user.email}
            </p>
            <p className="text-[15px] font-semibold text-gray-700 mb-3">
              <span className="text-[#EE5C24]">Birthdate:</span>{" "}
              {user.birthdate}
            </p>
            <p className="text-[15px] font-semibold text-gray-700 mb-3">
              <span className="text-[#EE5C24]">Phone Number:</span>{" "}
              {user.phoneNumber}
            </p>
            <p className="text-[15px] font-semibold text-gray-700 mb-3">
              <span className="text-[#EE5C24]">Address:</span> {user.Address}
            </p>
            <p className="text-[15px] font-semibold text-gray-700 mb-3">
              <span className="text-[#EE5C24]">Community Id:</span> 123456
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
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Check-In</th>
              <th className="px-4 py-2">Check-Out</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Camera</th>
            </tr>
          </thead>
          <tbody>
            {/* Example data row, replace it with your actual data */}

            {user.tabledata.map((row) => (
              <tr key={row.id}>
                <td className="px-4 py-2 text-center">{row.id}</td>
                <td className="px-4 py-2 text-center">{row.date}</td>
                <td className="px-4 py-2 text-center">{row.checkIn}</td>
                <td className="px-4 py-2 text-center">{row.checkOut}</td>
                <td className="px-4 py-2 text-center">{row.location}</td>
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
