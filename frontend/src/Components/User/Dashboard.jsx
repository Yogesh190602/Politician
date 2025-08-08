// import { useState } from "react";
// import Candidate from "./Candidate.jsx";
// import Vote from "./Votes.jsx";



// const UserDashboard = () => {
//   const [activeSection, setActiveSection] = useState(null); // 'users' or 'elections'

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center text-violet-600 mb-8">User Dashboard</h1>

//       {/* Buttons */}
//       <div className="flex justify-center gap-20 mb-10">
//         <button
//           onClick={() => setActiveSection("candidate")}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
//         >
//           apply election
//         </button>

//          <button
//           onClick={() => setActiveSection("votes")}
//           className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
//         >
//           Vote
//         </button>

//         {/*<button
//           onClick={() => setActiveSection("nextelection")}
//           className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded shadow"
//         >
//           Next Election
//         </button>

//          <button
//           onClick={() => setActiveSection("electionday")}
//           className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow"
//         >
//           Election Day
//         </button> */}

//       </div>

//       {/* Conditional rendering */}
//       <div className="flex justify-center">
//         {activeSection === "candidate" && <Candidate />}
//        {activeSection === "votes" && <Vote />}
//         {/*  {activeSection === "nextelection" && <NextElection />}
//         {activeSection === "electionday" && <ElectionDay />} */}

//       </div>
//     </div>
//   );
// };

// export default UserDashboard;


// import Candidate from "./Candidate.jsx";
// import Vote from "./Votes.jsx";
// import User from "./header.jsx";

// const UserDashboard = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center text-violet-600 mb-8">
//         User Dashboard
//       </h1>

//       {/* Render both components directly */}

//       <div className="w-full max-w-2xl">
//           <User />
//         </div>
//       <div className="flex flex-col items-center gap-10">
//         <div className="w-full max-w-2xl">
//           <Candidate />
//         </div>

//         <div className="w-full max-w-2xl">
//           <Vote />
//         </div>

        
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;

import Candidate from "./Candidate.jsx";
import Vote from "./Votes.jsx";
import User from "./header.jsx";

const UserDashboard = () => {
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    

      {/* Main Content */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Header Component */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <User />
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Candidate Section */}
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-500 rounded-full p-2 mr-3">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Candidate Management
              </h2>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <Candidate />
            </div>
          </div>

          {/* Vote Section */}
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <div className="bg-green-500 rounded-full p-2 mr-3">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2v1a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Voting Portal
              </h2>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <Vote />
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default UserDashboard;
