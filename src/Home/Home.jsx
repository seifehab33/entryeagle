import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [count, setCount] = useState(0);
  const [Communitycount, setCommunityCount] = useState(0);
  const [history, setHistory] = useState([]);
  const admin_id = localStorage.getItem("Admin_id");
  const admin_name = localStorage.getItem("Admin_Name");

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get(
          "https://web-production-22c55.up.railway.app/get_counts/"
        );
        setCount(response.data.person_count);
        setCommunityCount(response.data.community_count);
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    };
    fetchCount();
  }, []);
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `https://web-production-22c55.up.railway.app/admins/login/history/${admin_id}/`
        );
        if (response.data.history) {
          const historyData = response.data.history.map((item) => ({
            login_time: new Date(item.login_time).toLocaleString(),
          }));

          // Keep only the latest three entries
          const latestThreeEntries = historyData.slice(0, 3);

          setHistory(latestThreeEntries);
        }
      } catch (error) {
        console.error("Error fetching admin login history:", error);
      }
    };

    fetchHistory();
  }, [admin_id]);

  return (
    <div className="home gap-y-1 lg:px-8 px-4 mt-[50px] lg:mt-[30px] mb-7">
      <div className="heading capitalize">Good Morning, {admin_name}!</div>
      <div className="statics grid grid-cols-2 gap-2 py-2 lg:grid-cols-2 gap-y-6">
        <div className="first-stat stat w-[200px] md:w-[300px] lg:w-[400px] rounded-md">
          <span>Number of Persons</span>
          <div className="flex justify-between">
            <span>{count}</span>
            <Link
              to="/Person'sList"
              className="bg-white px-8 rounded-md text-[#F7982C] "
            >
              Go
            </Link>
          </div>
        </div>
        <div className="second-stat stat w-[200px] md:w-[300px] lg:w-[400px] rounded-md">
          <span>Number of Communities</span>
          <div className="flex justify-between">
            <span>{Communitycount}</span>
            <Link
              to="/CommunityList"
              className="bg-white px-8 rounded-md text-[#F7982C] "
            >
              Go
            </Link>
          </div>
        </div>
        <div className="third-stat stat w-[200px] md:w-[300px] lg:w-[400px] rounded-md">
          {/* <span>22</span>
          <span>Person in Camera 1</span> */}
          <span>Login Time</span>
          <hr />
          <ul>
            {history.map((login, index) => (
              <li key={index}>{login.login_time}</li>
            ))}
          </ul>
        </div>
        <div className="fourth-stat stat w-[200px] md:w-[300px] lg:w-[400px] rounded-md">
          <span>Show Cameras</span>
          {/* <span>Person in Camera 1</span> */}
          <Link to="/Dashboard" className="flex justify-end">
            <button className="bg-white px-8 rounded-md text-[#F7982C] ">
              Go
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
