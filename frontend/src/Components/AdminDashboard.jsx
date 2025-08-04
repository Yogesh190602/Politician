import { useState } from "react";
import UserList from "./UserList.jsx";
import LastElection from "./LastElections.jsx";
import NextElection from "./NextElection.jsx";
import ElectionDay from "./ElectionDay.jsx";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState(null); // 'users' or 'elections'

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-violet-600 mb-8">Admin Dashboard</h1>

      {/* Buttons */}
      <div className="flex justify-center gap-20 mb-10">
        <button
          onClick={() => setActiveSection("users")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          All Users
        </button>

        <button
          onClick={() => setActiveSection("lastelections")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Last Elections
        </button>

        <button
          onClick={() => setActiveSection("nextelection")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Next Election
        </button>

         <button
          onClick={() => setActiveSection("electionday")}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Election Day
        </button>

      </div>

      {/* Conditional rendering */}
      <div className="flex justify-center">
        {activeSection === "users" && <UserList />}
        {activeSection === "lastelections" && <LastElection />}
        {activeSection === "nextelection" && <NextElection />}
        {activeSection === "electionday" && <ElectionDay />}

      </div>
    </div>
  );
};




export default AdminDashboard;

