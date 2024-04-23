import React, { useState, useEffect } from "react";
import axios from "axios";

function UserHome() {
  const [communityId, setCommunityId] = useState("");
  const [communityname, setCommunityname] = useState("");
  const [userName, setUserName] = useState("");

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
        <div className="first-stat stat sm:w-full md:w-[300px] lg:w-[400px] rounded-md">
          <span className=" lg:text-xl">Already have Community ID</span>
          <span className="flex flex-row justify-between items-center gap-1">
            <input
              type="text"
              placeholder="Enter Community Id"
              className="rounded-xl w-[250px] placeholder:text-sm text-center  text-black placeholder:text-[#F7982C]"
            />
            <button className="bg-white rounded-xl text-[#F7982C] px-2 text-sm">
              Advance
            </button>
          </span>
        </div>

        <div className="second-stat stat sm:w-full md:w-[300px] lg:w-[400px]  rounded-md">
          <span>Create Community Id</span>
          <span className="flex justify-between">
            <div className=" flex gap-3 flex-col  px-3 text-sm text-center text-black">
              <div className="">
                {/* <span className="font-bold text-[#F7982C]">
                  Your Community Id:
                </span> */}
                <input
                  type="number"
                  className="p-[1px] rounded-md"
                  placeholder="Create Community ID"
                  value={communityId}
                  onChange={(e) => setCommunityId(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Create Name Community "
                  className="p-[1px] rounded-md"
                  value={communityname}
                  onChange={(e) => setCommunityname(e.target.value)}
                />
              </div>
            </div>
            <button
              className="bg-white rounded-xl text-[#F7982C] px-2 text-sm"
              onClick={handleCreateCommunity}
            >
              Create
            </button>
          </span>
        </div>
        <div className="third-stat stat sm:w-full md:w-[300px] lg:w-[400px] rounded-md">
          <span>0</span>
          <span>of your relative’s in Location 1 </span>
        </div>
        <div className="fourth-stat stat sm:w-full md:w-[300px] lg:w-[400px] rounded-md">
          <span>0</span>
          <span>of your relative’s in Location 2</span>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
