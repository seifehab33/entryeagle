import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function CommunityList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [communities, setCommunities] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCommunityId, setSelectedCommunityId] = useState(null);

  const navigate = useNavigate();
  const indexOfLastUser = currentPage * itemsPerPage;

  const handleShowRelatives = (id) => {
    navigate(`/Relatives/${id}`);
  };

  const handleOpen = (CommunityId) => {
    setSelectedCommunityId(CommunityId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/communities/");
        if (!response.ok) {
          throw new Error("Failed to fetch communities");
        }
        const data = await response.json();
        setCommunities(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCommunities();
  }, []);
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/delete-community/`, {
        data: { community_id: selectedCommunityId },
      });
      const updatedCommunities = communities.filter(
        (community) => community.Community_ID !== selectedCommunityId
      );
      setCommunities(updatedCommunities);
      handleClose();
    } catch (error) {
      console.error("Error deleting community:", error);
    }
  };

  return (
    <div className="flex flex-col gap-7 mt-5 px-8 mb-5">
      <div className="heading-relatives">
        <p className="text-3xl font-bold">Community's List</p>
        <div className="search-relatives flex items-center mb-2 gap-2">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-solid border-[#EE5C24] px-2 rounded-xl w-[300px] placeholder:text-[#EE5C24] placeholder:text-sm focus:border focus:border-solid focus:border-[#EE5C24]"
          />
          <button className="bg-[#EE5C24] px-1  rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 py-0.5"
              color="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="">
        <table className="table-auto w-full bg-[#FAF0DD] rounded-xl ">
          <thead className="border-b-[2px] border-[#EE5C24] ">
            <tr>
              <th className="px-4 py-2">No</th>
              {/* <th className="px-4 py-2">Name</th> */}
              <th className="px-4 py-2">Community Id</th>
              <th className="px-4 py-2">Relatives</th>
              <th className="px-4 py-2">Edit</th>
            </tr>
          </thead>
          <tbody>
            {communities.map((community, id) => (
              <>
                <tr key={id}>
                  <td className="px-4 py-2 text-center">{id + 1}</td>
                  {/* <td className="px-4 py-2 text-center">{community.name}</td> */}
                  <td className="px-4 py-2 text-center">
                    {community.Community_ID}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {/* Button to navigate to Relatives page */}
                    <button
                      onClick={() =>
                        handleShowRelatives(community.Community_ID)
                      }
                      className="text-[#ee5c24]  p-1 px-4 text-sm rounded-xl focus:outline-none bg-white"
                    >
                      Relatives
                    </button>
                  </td>
                  <td
                    className="px-4 py-2 text-center flex justify-center items-center cursor-pointer"
                    // onClick={() => handleDelete(community.Community_ID)}
                    onClick={() => handleOpen(community.Community_ID)}
                  >
                    {/* SVG icon for remove */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-[#ee5c24] bg-white p-1 rounded-xl"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Dialog open={open} handler={handleClose}>
          <DialogHeader>
            Are you sure you want to delete this community?
          </DialogHeader>
          <hr />
          <DialogBody>This will delete this community permanently.</DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleClose}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button className="bg-[#ee5c24]" onClick={handleDelete}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <div>
          <Typography variant="small" className="font-normal text-gray-900">
            Page {currentPage} of {Math.ceil(communities.length / itemsPerPage)}
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
            disabled={indexOfLastUser >= communities.length}
            className="text-[#ee5c24] border-[#ee5c24]"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CommunityList;
