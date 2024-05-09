import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import "../Person'sList/Person'sList.css";
import UserContext from "../UserContext";

function AdminPorifleDetails() {
  const { ComId, id } = useParams();
  const [user, setUser] = useState([]);
  const [size, setSize] = useState(null);
  const { userType } = useContext(UserContext);
  const AdminId = localStorage.getItem("Admin_id");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    ID: "",
    BirthDate: "",
    UserName: "",
    image_url: "",
    created_at: "",
  });

  const formattedName = `${user.first_name}_${user.last_name}`;

  // const navigate = useNavigate();

  const handleOpen = (value) => setSize(value);
  // const handleDelete = async () => {
  //   try {
  //     await axios.delete(`http://localhost:8000/person/${id}/`);
  //     navigate("/Person'sList");
  //     // setDeleted(true);
  //   } catch (error) {
  //     console.error("Error deleting person:", error);
  //   }
  // };
  // const handleViewHistory = () => {
  //   navigate(`/ProfileDetails/${user.id}/History`);
  // };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/admin-details/${AdminId}/`
        );
        setUser(response.data);
        console.log(response.data);
        setFormData({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          ID: response.data.id,
          BirthDate: response.data.birth_date,
          UserName: response.data.username,
          image_url: response.data.image_url,
          created_at: response.data.created_at,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [AdminId]);

  // const removeUserFromCommunity = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://127.0.0.1:8000/remove-user-from-community/",
  //       {
  //         person_id: user.id,
  //         community_id: parseInt(ComId), // Assuming you have this property in your user object
  //       }
  //     );
  //     console.log(response.data);
  //     setUser(null);
  //     navigate(`/Relatives/${ComId}`);

  //     // Handle success, maybe show a message or update the UI accordingly
  //   } catch (error) {
  //     console.error("Error removing user from community:", error);
  //     // Handle error, maybe show an error message to the user
  //   }
  // };
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://127.0.0.1:8000/admin-edit/${AdminId}/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Form data submitted:", formData);

      handleOpen(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const formattedCreatedAt = new Date(formData.created_at).toLocaleString(
    "en-US",
    {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      month: "numeric",
      day: "numeric",
      year: "numeric",
    }
  );

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div className="profile-details sm:mx-0 lg:mx-8 p-3 py-4 bg-[#f5e1bcc8] my-5 lg:mt-8 flex flex-col gap-1 lg:rounded-md landscape-animation">
      <div className="heading-details flex md:flex-row lg:flex-row flex-col gap-2 justify-between mb-5 lg:mb-8">
        <div className="flex flex-col gap-2 md:flex-row lg:flex-row lg:gap-8">
          <img
            src={`http://127.0.0.1:8000/${formData.image_url}`}
            alt="userimg"
            className="h-[300px] w-[300px] rounded-full   transition duration-300 ease-in-out transform hover:scale-105 object-cover object-center"
          />
          <div className="">
            <p className="font-bold text-4xl capitalize">
              {formData.first_name}
            </p>
            <p>@{formattedName}</p>
          </div>
        </div>
        {/* <div>
          <button
            className="relative flex h-[50px] w-40 items-center justify-center overflow-hidden bg-white text-[#EE5C24] shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-orange-600 before:duration-500 before:ease-out hover:shadow-orange-600 hover:text-white hover:before:h-56 hover:before:w-56"
            onClick={handleViewHistory}
          >
            <span className="relative z-10">View History</span>
          </button>
        </div> */}
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
          <p>
            <span>UserName:</span> {formData.UserName}
          </p>

          <p>
            <span>BirthDate:</span> {formData.BirthDate}
          </p>
          <p>
            <span>Created_At:</span>
            {formattedCreatedAt}
          </p>
        </div>
      </div>
      <div className="op-buttons flex justify-end gap-2">
        {ComId && (
          <button
            // onClick={removeUserFromCommunity}
            className="relative flex h-[50px] w-40 items-center justify-center overflow-hidden bg-white text-[#EE5C24] shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-orange-600 before:duration-500 before:ease-out hover:shadow-orange-600 hover:text-white hover:before:h-56 hover:before:w-56"
          >
            <span className="relative z-10 text-sm">Remove from Community</span>
          </button>
        )}
        {userType === "admin" && AdminId !== id && (
          <button
            // onClick={handleDelete}
            className="relative flex h-[50px] w-40 items-center justify-center overflow-hidden bg-white text-[#EE5C24] shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-orange-600 before:duration-500 before:ease-out hover:shadow-orange-600 hover:text-white hover:before:h-56 hover:before:w-56"
          >
            <span className="relative z-10">Delete</span>
          </button>
        )}

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
                  value={formData.UserName}
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

export default AdminPorifleDetails;
