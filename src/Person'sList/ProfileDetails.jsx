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
  const [size, setSize] = useState(null);
  const [responseEdit, setResponseEdit] = useState(null);
  const [image, setImage] = useState(null);
  const [selectedFileName, setSelectedImageName] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    ID: "",
    BirthDate: "",
    Email: "",
    Address: "",
    PhoneNumber: "",
    photo_url: "",
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
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          ID: response.data.id,
          BirthDate: response.data.birth_date,
          Email: response.data.email,
          photo_url: response.data.photo_url,
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
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/person/${id}/edit/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResponseEdit(data);
      // Logic to update user data
      // const updatedUser = { ...user, ...formData };
      console.log("Form data submitted:", formData);
      // Close the dialog after form submission
      handleOpen(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSubmit = (e) => {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setImage(image);
    setSelectedImageName(image.name);
  };

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div className="profile-details sm:mx-0 lg:mx-8 p-3 py-4 bg-[#f5e1bcc8] my-5 lg:mt-8 flex flex-col gap-1 lg:rounded-md landscape-animation">
      <div className="heading-details flex md:flex-row lg:flex-row flex-col gap-2 justify-between mb-5 lg:mb-8">
        <div className="flex flex-col gap-2 md:flex-row lg:flex-row lg:gap-8">
          <img
            src={`http://127.0.0.1:8000/${formData.photo_url}`}
            alt="userimg"
            className="h-[250px] w-[250px] rounded-full drop-shadow-xl shadow-gray-600"
          />
          <div className="">
            <p className="font-bold text-4xl capitalize">
              {formData.first_name}
            </p>
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
            <span>FirstName:</span> {formData.first_name}
          </p>
          <p>
            {" "}
            <span>LastName:</span> {formData.last_name}
          </p>
          <p>
            <span>ID:</span> {formData.ID}
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
            <span>Email:</span> {formData.Email}
          </p>
          <p>
            <span>CommunityId:</span> 12345
          </p>
          <p>
            <span>BirthDate:</span> {formData.BirthDate}
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
          <form onSubmit={handleEdit}>
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-gray-700"
                >
                  FirstName
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="mt-1 p-2 rounded-md border border-solid border-[#EE5C24] focus:border focus:border-solid focus:border-[#EE5C24]  block w-full shadow-sm sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="LastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  LastName
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="last_name"
                  value={formData.last_name}
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
                  readOnly
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
                  name="birth_date"
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

              {/* Add more input fields here */}
            </div>
            <DialogFooter>
              {/* <Button
                variant="text"
                color="red"
                onClick={() => handleOpen(null)}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button> */}
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
