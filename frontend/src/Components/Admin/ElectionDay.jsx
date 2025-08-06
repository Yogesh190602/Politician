
import { useState } from "react";
import ElectionDate from "./ElectionDay/Date.jsx";
import ElectionCandidates from "./ElectionDay/Candidate.jsx";
import Votes from "./ElectionDay/Votes.jsx";
import ElectionDay from "./ElectionDay/Winner.jsx";

const ElectionDayDashboard = () => {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-violet-600 mb-8">ElectionDay Dashboard</h1>

      {/* Buttons */}
      <div className="flex justify-center gap-20 mb-10">
        <button
          onClick={() => setActiveSection("date")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Add Next Election Date
        </button>

        <button
          onClick={() => setActiveSection("lastelections")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Candidates
        </button> 

        <button
          onClick={() => setActiveSection("votes")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          votes
        </button>

         <button
          onClick={() => setActiveSection("electionday")}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Election Winner
        </button>

      </div>

      {/* Conditional rendering */}
      <div className="flex justify-center">
        {activeSection === "date" && <ElectionDate />}
        {activeSection === "lastelections" && <   ElectionCandidates/>}
        {activeSection === "votes" && <Votes />}
        {activeSection === "electionday" && <ElectionDay />}

      </div>
    </div>
  );
};

export default ElectionDayDashboard;

