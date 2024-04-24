import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import "./Person'sList.css";

function ProfileDetails() {
  const { ComId, id } = useParams();
  const [user, setUser] = useState([]);
  const [size, setSize] = useState(null); // Added state for size
  const [formData, setFormData] = useState({
    name: "",
    ID: "",
    BirthDate: "",
    Email: "",
    Address: "",
    PhoneNumber: "",
  });

  const formattedName = `${user.first_name}_${user.last_name}`;

  const navigate = useNavigate();

  const handleOpen = (value) => setSize(value);

  const handleViewHistory = () => {
    navigate(`/ProfileDetails/${user.id}/History`);
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/persons/${id}/`
        );
        setUser(response.data);
        console.log(response.data);
        setFormData({
          name: response.data.first_name,
          ID: response.data.id,
          BirthDate: response.data.birth_date,
          Email: response.data.email,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [id]);
  const removeUserFromCommunity = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/remove-user-from-community/",
        {
          person_id: user.id,
          community_id: parseInt(ComId), // Assuming you have this property in your user object
        }
      );
      console.log(response.data);
      setUser(null);
      navigate(`/Relatives/${ComId}`);

      // Handle success, maybe show a message or update the UI accordingly
    } catch (error) {
      console.error("Error removing user from community:", error);
      // Handle error, maybe show an error message to the user
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to update user data
    // const updatedUser = { ...user, ...formData };
    console.log("Form data submitted:", formData);
    // Close the dialog after form submission
    handleOpen(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div className="profile-details sm:mx-0 lg:mx-8 p-3 py-4 bg-[#f5e1bcc8] my-5 lg:mt-8 flex flex-col gap-1 lg:rounded-md landscape-animation">
      <div className="heading-details flex md:flex-row lg:flex-row flex-col gap-2 justify-between mb-5 lg:mb-8">
        <div className="flex flex-col gap-2 md:flex-row lg:flex-row lg:gap-8">
          <img
            src={`http://127.0.0.1:8000/${user.photo_url}`}
            alt="userimg"
            className="h-[250px] w-[250px] rounded-full drop-shadow-xl shadow-gray-600"
          />
          <div className="">
            <p className="font-bold text-4xl capitalize">{user.first_name}</p>
            <p>@{formattedName}</p>
          </div>
        </div>
        <div>
          <button
            className="relative flex h-[50px] w-40 items-center justify-center overflow-hidden bg-white text-[#EE5C24] shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-orange-600 before:duration-500 before:ease-out hover:shadow-orange-600 hover:text-white hover:before:h-56 hover:before:w-56"
            onClick={handleViewHistory}
          >
            <span className="relative z-10">View History</span>
          </button>
        </div>
      </div>
      <div className="indetails grid grid-cols-2">
        <div className="flex flex-col gap-2">
          <p>
            {" "}
            <span>FirstName:</span> {user.first_name}
          </p>
          <p>
            {" "}
            <span>LastName:</span> {user.last_name}
          </p>
          <p>
            <span>ID:</span> {user.id}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {/* <p>
            <span>Phone No:</span> {user.phoneNumber}
          </p>
          <p>
            <span>Address:</span> {user.Address}
          </p> */}
          <p>
            <span>Email:</span> {user.email}
          </p>
          <p>
            <span>CommunityId:</span> 12345
          </p>
          <p>
            <span>BirthDate:</span> {user.birth_date}
          </p>
        </div>
      </div>
      <div className="op-buttons flex justify-end gap-2">
        <button
          onClick={removeUserFromCommunity}
          className="relative flex h-[50px] w-40 items-center justify-center overflow-hidden bg-white text-[#EE5C24] shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-orange-600 before:duration-500 before:ease-out hover:shadow-orange-600 hover:text-white hover:before:h-56 hover:before:w-56"
        >
          <span className="relative z-10">Remove</span>
        </button>
        <button
          className="relative flex h-[50px] w-40 items-center justify-center overflow-hidden bg-white text-[#EE5C24] shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-orange-600 before:duration-500 before:ease-out hover:shadow-orange-600 hover:text-white hover:before:h-56 hover:before:w-56"
          onClick={() => handleOpen("xs")}
          variant="gradient"
        >
          <span className="relative z-10">Edit</span>
        </button>
      </div>
      <Dialog
        open={
          size === "xs" ||
          size === "sm" ||
          size === "md" ||
          size === "lg" ||
          size === "xl"
        }
        onClose={() => handleOpen(null)}
      >
        <DialogHeader>Update Profile</DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Change Image
                </label>
                <button className="p-1 px-2 bg-[#EE5C24] text-white text-sm rounded-xl">
                  Choose File
                </button>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 p-2 rounded-md border border-solid border-[#EE5C24] focus:border focus:border-solid focus:border-[#EE5C24]  block w-full shadow-sm sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="ID"
                  className="block text-sm font-medium text-gray-700"
                >
                  ID
                </label>
                <input
                  type="text"
                  id="ID"
                  name="ID"
                  value={formData.ID}
                  onChange={handleChange}
                  className="mt-1 p-2 rounded-md border border-solid border-[#EE5C24] focus:border focus:border-solid focus:border-[#EE5C24]  block w-full shadow-sm sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="BirthDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  BirthDate
                </label>
                <input
                  type="text"
                  id="BirthDate"
                  name="BirthDate"
                  value={formData.BirthDate}
                  onChange={handleChange}
                  className="mt-1 p-2 rounded-md border border-solid border-[#EE5C24] focus:border focus:border-solid focus:border-[#EE5C24]  block w-full shadow-sm sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="Email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  className="mt-1 p-2 rounded-md border border-solid border-[#EE5C24] focus:border focus:border-solid focus:border-[#EE5C24]  block w-full shadow-sm sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="Address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="Address"
                  name="Address"
                  value={formData.Address}
                  onChange={handleChange}
                  className="mt-1 p-2 rounded-md border border-solid border-[#EE5C24] focus:border focus:border-solid focus:border-[#EE5C24]  block w-full shadow-sm sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="PhoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  PhoneNumber
                </label>
                <input
                  type="text"
                  id="PhoneNumber"
                  name="PhoneNumber"
                  value={formData.PhoneNumber}
                  onChange={handleChange}
                  className="mt-1 p-2 rounded-md border border-solid border-[#EE5C24] focus:border focus:border-solid focus:border-[#EE5C24] block w-full shadow-sm sm:text-sm"
                />
              </div>
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
          </form>{" "}
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default ProfileDetails;
