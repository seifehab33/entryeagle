// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// function RelativesList() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [relativesList, setRelativesList] = useState([]);
//   const communityId = localStorage.getItem("CommunityId");

//   useEffect(() => {
//     const fetchRelativesList = async () => {
//       try {
//         const response = await axios.get(
//           `http://127.0.0.1:8000/users-in-community/${communityId}/`
//         );
//         if (response.data) {
//           setRelativesList(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching relatives list:", error);
//       }
//     };

//     fetchRelativesList();
//   }, [communityId]);

//   const filteredRelatives = relativesList.filter((relative) =>
//     relative.user_first.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleFind = (userId) => {
//     console.log("Find button clicked for user with ID:", userId);
//     // Logic for handling the "Find" button click
//   };

//   return (
//     <div className="relatives px-8 my-[10px] mb-5">
//       <div className="heading-relatives">
//         <p className="text-3xl font-bold">Relatives' List</p>
//         <div className="search-relatives flex items-center mb-2 gap-2">
//           <input
//             type="text"
//             placeholder="Search"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="border border-solid border-[#EE5C24] px-2 rounded-xl w-[300px] placeholder:text-[#EE5C24] placeholder:text-sm focus:border focus:border-solid focus:border-[#EE5C24]"
//           />
//           <button className="bg-[#EE5C24] px-1  rounded-xl">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="1.5"
//               stroke="currentColor"
//               className="w-6 h-6 py-0.5"
//               color="white"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//       <div className="list mb-2">
//         <div className="card-user grid grid-cols-1 place-items-center lg:place-items-start md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredRelatives.map((relative) => (
//             <div
//               key={relative.user_id}
//               className="card-1 bg-[#F5E1BC] h-[250px] w-full py-2 px-4 rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center"
//             >
//               <div className="img-header">
//                 <img
//                   src={`http://127.0.0.1:8000/${relative.photo_url}`} // Prepend the base URL to the photo_url
//                   alt={`person-${relative.user_id}`}
//                   className="w-[100px] h-[100px] rounded-full mx-auto"
//                 />
//               </div>
//               <p className="text-center font-semibold text-lg mt-2 text-[#EE5C24]">
//                 {relative.user_first}
//                 {relative.user_last}
//               </p>
//               <div className="find flex justify-center items-center mt-4">
//                 <Link to={`/Relatives'List/user/${relative.user_id}`}>
//                   <button
//                     className="bg-white w-[300px] lg:w-[150px]  text-[#EE5C24] flex items-center justify-center border border-solid border-[#EE5C24] py-2 px-4 rounded-xl h-[30px]"
//                     onClick={() => handleFind(relative.user_id)}
//                   >
//                     Find
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RelativesList;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function RelativesList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [relativesList, setRelativesList] = useState([]);
  const communityId = localStorage.getItem("CommunityId");

  useEffect(() => {
    const fetchRelativesList = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/users-in-community/${communityId}/`
        );
        if (response.data) {
          setRelativesList(response.data);
        }
      } catch (error) {
        console.error("Error fetching relatives list:", error);
      }
    };

    fetchRelativesList();
  }, [communityId]);

  const filteredRelatives = relativesList.filter((relative) =>
    relative.user_first.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFind = (userId) => {
    console.log("Find button clicked for user with ID:", userId);
    // Logic for handling the "Find" button click
  };

  return (
    <div className="relatives px-8 my-[10px] mb-5">
      <div className="heading-relatives">
        <p className="text-3xl font-bold">Relatives' List</p>
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
      <div className="list mb-2">
        {filteredRelatives.length === 0 ? (
          <p className="text-3xl font-bold capitalize tracking-wide text-center text-[#ee5c24]">
            No relatives yet
          </p>
        ) : (
          <div className="card-user grid grid-cols-1 place-items-center lg:place-items-start md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRelatives.map((relative) => (
              <div
                key={relative.user_id}
                className="card-1 bg-[#F5E1BC] h-[250px] w-full py-2 px-4 rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center"
              >
                <div className="img-header">
                  <img
                    src={`http://127.0.0.1:8000/${relative.photo_url}`} // Prepend the base URL to the photo_url
                    alt={`person-${relative.user_id}`}
                    className="w-[150px] h-[150px] rounded-full object-cover object-top mx-auto"
                  />
                </div>
                <p className="text-center font-semibold text-lg mt-2 text-[#EE5C24]">
                  {relative.user_first} {relative.user_last}
                </p>
                <div className="find flex justify-center items-center mt-4">
                  <Link to={`/Relatives'List/user/${relative.user_id}`}>
                    <button
                      className="bg-white w-[300px] lg:w-[150px]  text-[#EE5C24] flex items-center justify-center border border-solid border-[#EE5C24] py-2 px-4 rounded-xl h-[30px]"
                      onClick={() => handleFind(relative.user_id)}
                    >
                      Find
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RelativesList;
