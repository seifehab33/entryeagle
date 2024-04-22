import React, { useState } from "react";
import { Users } from "./Person'sList";
import { useParams } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";

function HistoryPerson() {
  const { id } = useParams();
  const user = Users.find((user) => user.id === parseInt(id)); // Filter the user by id

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change this value to adjust items per page

  // Logic to calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = user
    ? user.tabledata.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  // Logic to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      {/* Table with pagination */}
      <div className="relative flex flex-col gap-3 ">
        <table className="table-auto w-full bg-[#FAF0DD] rounded-xl">
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
            {currentItems.map((row) => (
              <tr key={row.id}>
                <td className="px-4 py-2 text-center">{row.id}</td>
                <td className="px-4 py-2 text-center">{row.date}</td>
                <td className="px-4 py-2 text-center">{row.checkIn}</td>
                <td className="px-4 py-2 text-center">{row.checkOut}</td>
                <td className="px-4 py-2 text-center">{row.location}</td>
                <td className="px-4 py-2 text-center">{row.camera}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <div>
            <Typography variant="small" className="font-normal text-gray-900">
              Page {currentPage} of{" "}
              {Math.ceil(user.tabledata.length / itemsPerPage)}
            </Typography>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1 || !user}
              className="text-[#EE5C24] border-[#ee5c24]"
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              className="text-[#ee5c24] border-[#ee5c24]"
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastItem >= (user ? user.tabledata.length : 0)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryPerson;
