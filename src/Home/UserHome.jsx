import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserHome() {
  const [showFirstTwoStats, setShowFirstTwoStats] = useState(true);

  const [communityId, setCommunityId] = useState("");
  const [communityname, setCommunityname] = useState("");
  const [userName, setUserName] = useState("");
  const handleAdvance = () => {
    setShowFirstTwoStats(false);
  };
  const navigate = useNavigate();
  const handlenavigate = () => {
    navigate("/Relatives'List");
  };
  useEffect(() => {
    // Retrieve name from localStorage when component mounts
    const name = localStorage.getItem("firstname");
    if (name) {
      setUserName(name);
    }
  }, []);
  const handleCreateCommunity = async () => {
    try {
      // Make sure to replace 'your-api-endpoint' with the actual endpoint
      const response = await axios.post(
        "http://127.0.0.1:8000/communities/create/",
        { community_id: parseInt(communityId, 10), name: communityname }
      );
      console.log(response.data);
      console.log("Community created:", response.data);
      // Optionally, you can handle the response data or show a success message to the user
      setCommunityname("");
      setCommunityId("");
      setShowFirstTwoStats(false);
    } catch (error) {
      console.error("Error creating community:", error);
      // Optionally, you can handle errors or show an error message to the user
    }
  };
  return (
    <div className="home gap-y-1 lg:px-8 px-4 mt-[50px] lg:mt-[90px] mb-[40px]">
      <div className="heading capitalize">
        Good Morning, {userName || "Guest"} !
      </div>
      <div className="statics grid sm:grid-cols-1 md:grid-cols-2 gap-2 py-2 lg:grid-cols-2 gap-y-6">
        {showFirstTwoStats ? (
          <>
            <div className="first-stat stat sm:w-full md:w-[300px] lg:w-[400px] rounded-md">
              <span className="lg:text-xl">Already have Community ID</span>
              <span className="flex flex-row justify-between items-center gap-1">
                <input
                  type="text"
                  placeholder="Enter Community Id"
                  className="rounded-xl w-[250px] placeholder:text-sm text-center text-black placeholder:text-[#F7982C]"
                />
                <button
                  className="bg-white rounded-xl text-[#F7982C] px-2 text-sm"
                  onClick={handleAdvance}
                >
                  Advance
                </button>
              </span>
            </div>
            <div className="second-stat stat sm:w-full md:w-[300px] lg:w-[400px] rounded-md">
              <span>Create Community Id</span>
              <span className="flex justify-between">
                <div className="flex gap-3 flex-col px-3 text-sm text-center text-black">
                  <input
                    type="number"
                    className="p-[1px] rounded-md"
                    placeholder="Create Community ID"
                    value={communityId}
                    onChange={(e) => setCommunityId(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Create Name Community"
                    className="p-[1px] rounded-md"
                    value={communityname}
                    onChange={(e) => setCommunityname(e.target.value)}
                  />
                </div>
                <button
                  className="bg-white rounded-xl text-[#F7982C] px-2 text-sm"
                  onClick={handleCreateCommunity}
                >
                  Create
                </button>
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="third-stat stat sm:w-full md:w-[300px] lg:w-[400px] rounded-md">
              <span>Relatives</span>
              <span>Number of Relatives : 6 </span>
            </div>
            <div className="fourth-stat stat sm:w-full md:w-[300px] lg:w-[400px] rounded-md">
              <span>Show Your Relative</span>
              <span className="flex justify-end">
                <button
                  className="bg-white px-8 rounded-md text-[#F7982C] text-sm "
                  onClick={handlenavigate}
                >
                  Show
                </button>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserHome;
