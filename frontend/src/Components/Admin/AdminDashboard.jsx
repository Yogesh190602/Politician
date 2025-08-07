// import { useState } from "react";
// import UserList from "./UserList.jsx";
// import LastElection from "./LastElections.jsx";
// import NextElection from "./NextElection.jsx";
// import ElectionDay from "./ElectionDay.jsx";

// const AdminDashboard = () => {
//   const [activeSection, setActiveSection] = useState(null); // 'users' or 'elections'

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center text-violet-600 mb-8">Admin Dashboard</h1>

//       {/* Buttons */}
//       <div className="flex justify-center gap-20 mb-10">
//         <button
//           onClick={() => setActiveSection("users")}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
//         >
//           All Users
//         </button>

//         <button
//           onClick={() => setActiveSection("lastelections")}
//           className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
//         >
//           Last Elections
//         </button>

//         <button
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
//         </button>

//       </div>

//       {/* Conditional rendering */}
//       <div className="flex justify-center">
//         {activeSection === "users" && <UserList />}
//         {activeSection === "lastelections" && <LastElection />}
//         {activeSection === "nextelection" && <NextElection />}
//         {activeSection === "electionday" && <ElectionDay />}

//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import { useState } from "react";
import UserList from "./UserList.jsx";
import LastElection from "./LastElections.jsx";
import NextElection from "./NextElection.jsx";
import ElectionDay from "./ElectionDay.jsx";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      key: "users",
      label: "All Users",
      icon: "👥",
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
    },
    {
      key: "lastelections",
      label: "Last Elections",
      icon: "📊",
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700",
    },
    {
      key: "nextelection",
      label: "Next Election",
      icon: "🗳️",
      color: "from-yellow-500 to-yellow-600",
      hoverColor: "hover:from-yellow-600 hover:to-yellow-700",
    },
    {
      key: "electionday",
      label: "Election Day Dashboard",
      icon: "📅",
      color: "from-red-500 to-red-600",
      hoverColor: "hover:from-red-600 hover:to-red-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`
                relative group overflow-hidden rounded-xl p-6 text-white font-semibold
                bg-gradient-to-r ${section.color} ${section.hoverColor}
                shadow-lg hover:shadow-xl
                ${
                  activeSection === section.key
                    ? "ring-4 ring-white ring-opacity-60"
                    : ""
                }
              `}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="text-3xl">{section.icon}</div>
                <span className="text-lg font-medium">{section.label}</span>
              </div>

              {/* Active indicator */}
              {activeSection === section.key && (
                <div className="absolute top-2 right-2">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {activeSection ? (
            <div>
              {/* Section Content */}
              <div className="p-6">
                {activeSection === "users" && <UserList />}
                {activeSection === "lastelections" && <LastElection />}
                {activeSection === "nextelection" && <NextElection />}
                {activeSection === "electionday" && <ElectionDay />}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Welcome to Admin Dashboard
              </h3>
              <p className="text-gray-500 text-center max-w-md">
                Select a section above to begin managing your platform. Choose
                from user management, election tracking, or planning tools.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
