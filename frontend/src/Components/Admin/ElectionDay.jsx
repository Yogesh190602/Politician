
// import { useState } from "react";
// import ElectionDate from "./ElectionDay/Date.jsx";
// import ElectionCandidates from "./ElectionDay/Candidate.jsx";
// import Votes from "./ElectionDay/Votes.jsx";
// import ElectionDay from "./ElectionDay/Winner.jsx";

// const ElectionDayDashboard = () => {
//   const [activeSection, setActiveSection] = useState(null);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center text-violet-600 mb-8">ElectionDay Dashboard</h1>

//       {/* Buttons */}
//       <div className="flex justify-center gap-20 mb-10">
//         <button
//           onClick={() => setActiveSection("date")}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
//         >
//           Add Next Election Date
//         </button>

//         <button
//           onClick={() => setActiveSection("lastelections")}
//           className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
//         >
//           Candidates
//         </button> 

//         <button
//           onClick={() => setActiveSection("votes")}
//           className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded shadow"
//         >
//           votes
//         </button>

//          <button
//           onClick={() => setActiveSection("electionday")}
//           className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow"
//         >
//           Election Winner
//         </button>

//       </div>

//       {/* Conditional rendering */}
//       <div className="flex justify-center">
//         {activeSection === "date" && <ElectionDate />}
//         {activeSection === "lastelections" && <   ElectionCandidates/>}
//         {activeSection === "votes" && <Votes />}
//         {activeSection === "electionday" && <ElectionDay />}

//       </div>
//     </div>
//   );
// };

// export default ElectionDayDashboard;

import { useState } from "react";
import ElectionDate from "./ElectionDay/Date.jsx";
import ElectionCandidates from "./ElectionDay/Candidate.jsx";
import Votes from "./ElectionDay/Votes.jsx";
import ElectionDay from "./ElectionDay/Winner.jsx";

const ElectionDayDashboard = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      key: "date",
      label: "Add Next Election Date",
      icon: "📅",
      color: "from-blue-500 to-cyan-500",
      hoverColor: "hover:from-blue-600 hover:to-cyan-600",
      bgColor: "bg-blue-500"
    },
    {
      key: "lastelections", 
      label: "Candidates",
      icon: "👥",
      color: "from-teal-500 to-emerald-500",
      hoverColor: "hover:from-teal-600 hover:to-emerald-600",
      bgColor: "bg-teal-500"
    },
    {
      key: "votes",
      label: "Votes",
      icon: "🗳️",
      color: "from-indigo-500 to-purple-500",
      hoverColor: "hover:from-indigo-600 hover:to-purple-600",
      bgColor: "bg-indigo-500"
    },
    {
      key: "electionday",
      label: "Election Winner",
      icon: "🏆",
      color: "from-orange-500 to-red-500",
      hoverColor: "hover:from-orange-600 hover:to-red-600",
      bgColor: "bg-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Sidebar */}
      <div className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="bg-gradient-to-r from-blue-600  rounded-xl to-cyan-600 text-white p-6">
          <h1 className="text-2xl font-bold mb-2">Election Day Dashboard</h1>
          <p className="text-blue-100 text-sm">Manage your election process</p>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 p-4 space-y-3">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
            Management Tools
          </div>
          
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`
                w-full flex items-center space-x-4 p-4 rounded-lg text-left
                transition-all duration-200
                ${activeSection === section.key 
                  ? `${section.bgColor} text-white shadow-lg` 
                  : 'text-gray-700 hover:bg-gray-50 border border-gray-200'
                }
              `}
            >
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center text-lg
                ${activeSection === section.key 
                  ? 'bg-white bg-opacity-20' 
                  : 'bg-gray-100'
                }
              `}>
                {section.icon}
              </div>
              <div className="flex-1">
                <div className={`font-medium ${activeSection === section.key ? 'text-white' : 'text-gray-800'}`}>
                  {section.label}
                </div>
                <div className={`text-xs ${activeSection === section.key ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
                  {section.key === 'date' && 'Schedule elections'}
                  {section.key === 'lastelections' && 'Manage participants'}
                  {section.key === 'votes' && 'Track voting data'}
                  {section.key === 'electionday' && 'Declare results'}
                </div>
              </div>
              {activeSection === section.key && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">ED</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">Election Admin</div>
              <div className="text-xs text-gray-500">System Manager</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex items-center justify-center justify-between">
            <div>
              {activeSection ? (
                <div className="flex items-center  space-x-3">
                  <span className="text-2xl">
                    {sections.find(s => s.key === activeSection)?.icon}
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {sections.find(s => s.key === activeSection)?.label}
                    </h2>
                    <p className="text-gray-600">
                      {activeSection === 'date' && 'Set up your next election schedule'}
                      {activeSection === 'lastelections' && 'Add and manage election candidates'}
                      {activeSection === 'votes' && 'Monitor and track all votes'}
                      {activeSection === 'electionday' && 'View and declare election winners'}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
                  <p className="text-gray-600">Select a tool from the sidebar to get started</p>
                </div>
              )}
            </div>
            
            
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          {activeSection ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {activeSection === "date" && <ElectionDate />}
              {activeSection === "lastelections" && <ElectionCandidates />}
              {activeSection === "votes" && <Votes />}
              {activeSection === "electionday" && <ElectionDay />}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
              <div className="text-center max-w-md mx-auto">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🗳️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Welcome to Election Day Dashboard
                </h3>
                <p className="text-gray-600 mb-6">
                  Select a management tool from the sidebar to begin organizing your election process. 
                  You can set dates, manage candidates, track votes, and announce winners.
                </p>
                
                
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElectionDayDashboard;
