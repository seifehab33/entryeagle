import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserHome() {
  const [error, setError] = useState("");
  const [communityId, setCommunityId] = useState("");
  const [userName, setUserName] = useState("");
  const [relativesCount, setRelativesCount] = useState(0);
  const [communities, setCommunities] = useState([]);
  const [communityCreated, setCommunityCreated] = useState(false); // State to track if a community has been created
  const navigate = useNavigate();
  const UserId = localStorage.getItem("User_Id");
  const communityIdLocal = localStorage.getItem("CommunityId");
  const name = localStorage.getItem("firstname");
  useEffect(() => {
    // Retrieve name from localStorage when component mounts
    if (name) {
      setUserName(name);
    }
    if (communityIdLocal) {
      setCommunityCreated(true);
    }
  }, [name, communityIdLocal]); // no name , communityIdlocal , if show error
  useEffect(() => {
    const fetchRelativesCount = async () => {
      try {
        const response = await axios.get(
          `https://web-production-22c55.up.railway.app/users-in-community/${communityIdLocal}/`
        );
        if (response.data) {
          setRelativesCount(response.data);
        }
      } catch (error) {
        console.error("Error fetching relatives count:", error);
      }
    };

    fetchRelativesCount();
  }, [communityIdLocal]);

  const handleCreateCommunity = async () => {
    try {
      const response = await axios.post(
        "https://web-production-22c55.up.railway.app/communities/create/",
        { community_id: parseInt(communityId, 10), person_id: UserId }
      );
      console.log("Community created:", response.data);
      // Optionally, you can handle the response data or show a success message to the user
      setCommunityId(response.data.Community_ID);
      localStorage.setItem("CommunityId", response.data.Community_ID);
      setCommunityCreated(true); // Set communityCreated flag to true
      navigate("");
    } catch (error) {
      console.error("Error creating community:", error);
      // Optionally, you can handle errors or show an error message to the user
    }
  };

  const handleCheckCommunity = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      await axios.post(
        "https://web-production-22c55.up.railway.app/communities/check/",
        {
          community_id: communityId,
        }
      );
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split("T")[0];
      await axios.post(
        "https://web-production-22c55.up.railway.app/add-user-to-community/",
        {
          person_id: UserId,
          community_id: communityId,
          join_date: formattedDate,
        }
      );
      localStorage.setItem("CommunityId", communityId);
      setCommunityCreated(true); // Set communityCreated flag to true
      navigate("/Relatives'List");
    } catch (error) {
      if (
        error.response &&
        error.response.data.error === "User already exists in the community"
      ) {
        navigate("/Relatives'List");
        localStorage.setItem("CommunityId", communityId);
      }
      if (
        error.response &&
        error.response.data.error === "Community does not exist"
      ) {
        setError("The community id doesn't exist");
      } else {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
  };
  useEffect(() => {
    const fetchUserCommunities = async () => {
      try {
        const response = await axios.get(
          `	https://web-production-22c55.up.railway.app/user/${UserId}/communities/`
        );
        setCommunities(response.data);
      } catch (error) {
        console.error("Error fetching user communities:", error);
      }
    };

    fetchUserCommunities();
  }, [UserId]);
  const numberOfUsers = relativesCount.length;

  const handleInputChange = (event) => {
    setCommunityId(event.target.value);
    setError("");
  };
  return (
    <div className="home gap-y-1 lg:px-8 px-4 mt-[50px] lg:mt-[90px] mb-[40px]">
      <div className="heading capitalize">
        Good Morning, {userName || "Guest"} !
      </div>
      <div className="statics grid sm:grid-cols-1 md:grid-cols-2 gap-2 py-2 lg:grid-cols-2 gap-y-6">
        {communityCreated ? (
          <>
            <div className="flex gap-2 ">
              <div className="third-stat stat sm:w-full md:w-[300px] lg:w-[400px]  rounded-md">
                <span>Relatives</span>
                <div className="flex justify-between">
                  <span>Number of Relatives : {numberOfUsers} </span>
                </div>
              </div>
              <div className="fourth-stat stat sm:w-full md:w-[300px] lg:w-[400px]   rounded-md">
                <span className="text-[10px]">Your Community Id</span>
                <span className="flex justify-end">
                  <div className="bg-white px-8 rounded-md text-[#F7982C] text-sm ">
                    <div className="rounded-md">{communityIdLocal}</div>
                  </div>
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="first-stat stat sm:w-full md:w-[300px] lg:w-[400px] rounded-md">
              <span className="lg:text-xl">Already have Community ID</span>
              <span className="flex flex-row justify-between items-center gap-1">
                <input
                  type="text"
                  placeholder="Enter Community Id"
                  value={communityId}
                  onChange={handleInputChange}
                  className="rounded-xl w-[250px] placeholder:text-sm text-center text-black placeholder:text-[#F7982C]"
                />
                <button
                  className="bg-white rounded-xl text-[#F7982C] px-2 text-sm"
                  onClick={handleCheckCommunity}
                  disabled={!communityId}
                >
                  Advance
                </button>
              </span>
            </div>

            <div className="second-stat stat sm:w-full md:w-[300px] lg:w-[400px] rounded-md">
              <span>Create Community Id</span>
              <span className="flex justify-between">
                <div className="flex gap-3 flex-col px-3 text-sm text-center text-black">
                  {/* <div className="rounded-md bg-white px-3">{communityId}</div> */}
                </div>
                <button
                  className="bg-white rounded-xl text-[#F7982C] px-2 text-sm"
                  onClick={handleCreateCommunity}
                >
                  Generate
                </button>
              </span>
            </div>
            <div className="second-stat stat sm:w-full md:w-[300px] lg:w-[400px] rounded-md">
              <span>List of Communities</span>
              <span className="flex justify-between">
                {communities.length === 0 ? (
                  <p>No communities found for this user.</p>
                ) : (
                  <div>
                    <ul>
                      {communities.map((community, index) => (
                        <li key={index}>
                          <strong>Community ID:</strong>{" "}
                          {community.Community_ID}, <strong>Join Date:</strong>{" "}
                          {community.Join_Date}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </span>
            </div>
          </>
        )}
      </div>
      {error && <div className="text-red-900 text-sm capitalize ">{error}</div>}
    </div>
  );
}

export default UserHome;
