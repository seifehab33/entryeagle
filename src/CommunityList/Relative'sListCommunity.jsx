import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function RelativesListCommunity() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [joinDate, setJoinDate] = useState("");
  // const [communityId, setCommunityId] = useState("");
  const [error, setError] = useState("");

  const [personId, setPersonId] = useState("");
  const handleOpen = () => setOpen(!open);
  const handleFind = (userId) => {
    console.log("Find button clicked for user with ID:", userId);
    // Logic for handling the "Find" button click
  };
  const handlePersonIdChange = (e) => {
    setPersonId(e.target.value); // Update personId state when the input value changes
  };
  useEffect(() => {
    // Get today's date in the format "YYYY-MM-DD"
    const today = new Date().toISOString().split("T")[0];
    setJoinDate(today);
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `	http://127.0.0.1:8000/users-in-community/${id}/`
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch users");
        }
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [id]);
  const filteredUsers = users.filter((user) =>
    user.user_first.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        join_date: joinDate,
        community_id: id,
        person_id: personId,
      };
      // Send a POST request to add a new person
      await axios.post(
        "http://127.0.0.1:8000/add-user-to-community/",
        formData
      );

      const response = await axios.get(
        `http://127.0.0.1:8000/users-in-community/${id}/`
      );
      if (response.status !== 200) {
        throw new Error("Failed to fetch users");
      }
      setUsers(response.data);
      handleOpen(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (
          error.response.data.error === "User already exists in the community"
        ) {
          console.log("User already exists in the community.");
          setError("User already exists in the community.");
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
      setOpen(true);
    }
  };
  return (
    <div className="relatives px-8 mt-[10px]">
      <div className="heading-relatives">
        <div className="flex justify-between">
          <p className="text-3xl font-bold">Relatives List</p>
          <button
            className="bg-white    text-[#EE5C24] flex items-center justify-center border border-solid border-[#EE5C24] py-2 px-4 rounded-xl h-[30px]"
            onClick={handleOpen}
          >
            Add new Person
          </button>
        </div>
        <p>Community Id: {id}</p>
        <div className="search-relatives flex items-center mb-2 gap-2 justify-center">
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
      <div className="list mb-2">
        <div className="card-user grid grid-cols-1 place-items-center lg:place-items-start md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.user_id}
              className="card-1 bg-[#F5E1BC] h-[250px] w-full py-2 px-4 rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center"
            >
              <div className="img-header">
                <img
                  src={`http://127.0.0.1:8000/${user.photo_url}`} // Prepend the base URL to the photo_url
                  alt={`person-${user.user_id}`}
                  className="w-[100px] h-[100px] object-cover object-top rounded-full mx-auto"
                />
              </div>
              <p className="text-center font-semibold text-lg mt-2 text-[#EE5C24]">
                <span className="capitalize">{user.user_first}</span>
                <span className="capitalize"> {user.user_last}</span>
              </p>
              <div className="find flex justify-center items-center mt-4">
                <Link
                  to={{
                    pathname: `/ProfileDetails/${id}/${user.user_id}`,
                  }}
                >
                  <button
                    className="bg-white w-[300px] lg:w-[150px]  text-[#EE5C24] flex items-center justify-center border border-solid border-[#EE5C24] py-2 px-4 rounded-xl h-[30px]"
                    onClick={() => handleFind(user.id)}
                  >
                    Profile Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader className="text-xl text-[#ee612a]">
            Add New Person
          </DialogHeader>
          <DialogBody>
            <form action="" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="Person ID"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Person Id
                  </label>
                  <input
                    type="text"
                    id="Person ID"
                    name="personId"
                    value={personId}
                    onChange={handlePersonIdChange}
                    className="mt-1 p-2 rounded-md border border-solid border-[#EE5C24] focus:border focus:border-solid focus:border-[#EE5C24]  block w-full shadow-sm sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="Community Id"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Community Id
                  </label>
                  <input
                    type="text"
                    id="Community Id"
                    name="communityId"
                    value={id}
                    readOnly
                    className="mt-1 p-2 rounded-md border border-solid border-[#EE5C24] focus:border focus:border-solid focus:border-[#EE5C24]  block w-full shadow-sm sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="Join Date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Join Date
                  </label>
                  <input
                    type="text"
                    id="Join Date"
                    name="joinDate"
                    value={joinDate}
                    readOnly
                    className="mt-1 p-2 rounded-md border border-solid border-[#EE5C24] focus:border focus:border-solid focus:border-[#EE5C24]  block w-full shadow-sm sm:text-sm"
                  />
                </div>
                {error && <p className="text-red-900 text-sm">{error}</p>}
                {/* Add more input fields here */}
              </div>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={() => handleOpen(null)}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button variant="" type="submit" className="bg-[#EE5C24]">
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </form>
          </DialogBody>
        </Dialog>
      </div>
    </div>
  );
}

export default RelativesListCommunity;
