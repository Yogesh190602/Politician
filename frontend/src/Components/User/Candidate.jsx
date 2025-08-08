// import { useState, useEffect } from "react";

// const electionCandidates = () => {
//   const [latestElection, setLatestElection] = useState(null);
//   const [hasApplied, setHasApplied] = useState(false);
//   const [candidateName, setCandidateName] = useState("");

//   const fetchLatestElection = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/admin/getElectionDay");
//       const data = await res.json();
//       if (data.getElecDay?.length > 0) {
//         const sorted = data.getElecDay.sort(
//           (a, b) => new Date(b.Date) - new Date(a.Date)
//         )[0];
//         setLatestElection(sorted);
//       } else {
//         setLatestElection(null);
//       }
//     } catch (err) {
//       console.error("Error fetching latest election:", err);
//     }
//   };

//   useEffect(() => {
//     fetchLatestElection();
//   }, []);

//   useEffect(() => {
//     const appliedId = localStorage.getItem("appliedElectionId");
//     if (latestElection && appliedId === latestElection._id) {
//       setHasApplied(true);
//     } else {
//       setHasApplied(false);
//     }
//   }, [latestElection]);

//   const handleApplyCandidate = async (e) => {
//     e.preventDefault();

//     if (!latestElection) {
//       alert("No election available to apply for.");
//       return;
//     }
//     try {
//       const res = await fetch("http://localhost:5000/admin/applyCandidate", {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           electionId: latestElection._id,
//           candidateName,
//         }),
//       });
//       const data = await res.json();
//       if (data.message) {
//         alert(data.message);
//         setCandidateName("");
//         localStorage.setItem("appliedElectionId", latestElection._id);
//         setHasApplied(true);
//         fetchLatestElection();
//       } else {
//         alert("Failed to apply as candidate.");
//       }
//     } catch (error) {
//       console.error("Error applying as candidate:", error);
//     }
//   };

//   return (
//     <div className="election-candidates">
//       {!hasApplied && latestElection && (
//         <form onSubmit={handleApplyCandidate}>
//           <h2>Apply for Election</h2>
//           <div>
//             <label>Candidate Name:</label>
//             <input
//               type="text"
//               id="candidateName"
//               value={candidateName}
//               onChange={(e) => setCandidateName(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Apply</button>
//         </form>
//       )}

//       {hasApplied && latestElection && (
//         <div className="p-4 bg-green-100 text-green-800 rounded shadow">
//           ✅ You have already applied for this election.
//         </div>
//       )}

//       {latestElection?.Candidates?.length > 0 && (
//         <div>
//           <h3> Applied Candidates </h3>

//           {latestElection.Candidates.map((candidate) => (
//             <p key={candidate._id}>{candidate.name}</p>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
// export default electionCandidates;
import { useState, useEffect } from "react";

const electionCandidates = () => {
  const [latestElection, setLatestElection] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [candidateName, setCandidateName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchLatestElection = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/admin/getElectionDay");
      const data = await res.json();
      if (data.getElecDay?.length > 0) {
        const sorted = data.getElecDay.sort(
          (a, b) => new Date(b.Date) - new Date(a.Date)
        )[0];
        setLatestElection(sorted);
      } else {
        setLatestElection(null);
      }
    } catch (err) {
      console.error("Error fetching latest election:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestElection();
  }, []);

  useEffect(() => {
    const appliedId = localStorage.getItem("appliedElectionId");
    if (latestElection && appliedId === latestElection._id) {
      setHasApplied(true);
    } else {
      setHasApplied(false);
    }
  }, [latestElection]);

  const handleApplyCandidate = async (e) => {
    e.preventDefault();

    if (!latestElection) {
      alert("No election available to apply for.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/admin/applyCandidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          electionId: latestElection._id,
          candidateName,
        }),
      });
      const data = await res.json();
      if (data.message) {
        alert(data.message);
        setCandidateName("");
        localStorage.setItem("appliedElectionId", latestElection._id);
        setHasApplied(true);
        fetchLatestElection();
      } else {
        alert("Failed to apply as candidate.");
      }
    } catch (error) {
      console.error("Error applying as candidate:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-48"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Election Info Header */}
      {latestElection && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <h3 className="text-lg font-semibold text-blue-800">Current Election</h3>
          </div>
          <p className="text-blue-700">
            <span className="font-medium">Date:</span> {new Date(latestElection.Date).toLocaleDateString()}
          </p>
          {latestElection.Title && (
            <p className="text-blue-700">
              <span className="font-medium">Title:</span> {latestElection.Title}
            </p>
          )}
        </div>
      )}

      {/* Application Form */}
      {!hasApplied && latestElection && (
        <div className="mb-6">
          <form onSubmit={handleApplyCandidate} className="space-y-4">
            <div className="flex items-center mb-4">
              <div className="bg-blue-500 rounded-full p-1 mr-2">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800">Apply for Candidacy</h4>
            </div>
            
            <div>
              <label htmlFor="candidateName" className="block text-sm font-medium text-gray-700 mb-2">
                Candidate Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="candidateName"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Application
            </button>
          </form>
        </div>
      )}

      {/* Success Message */}
      {hasApplied && latestElection && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <div className="bg-green-500 rounded-full p-1 mr-3">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="text-green-800 font-semibold">Application Submitted</h4>
              <p className="text-green-700 text-sm">You have successfully applied for this election.</p>
            </div>
          </div>
        </div>
      )}

      {/* Candidates List */}
      {latestElection?.Candidates?.length > 0 && (
        <div>
          <div className="flex items-center  mb-4">
            <div className="bg-green-500 rounded-full p-1 mr-2">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-800">
              Registered Candidates ({latestElection.Candidates.length})
            </h4>
          </div>
          
          <div className="flex flex-wrap space-y-5">
            {latestElection.Candidates.map((candidate, index) => (
              <div 
                key={candidate._id}
                className="flex items-center p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100"
              >
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-semibold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{candidate.name}</p>
                  <p className="text-sm text-gray-500">Candidate</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!latestElection && !loading && (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No Elections Available
          </h3>
          <p className="text-gray-500">
            There are currently no elections available for candidate applications.
          </p>
        </div>
      )}

      {/* No Candidates Yet */}
      {latestElection && latestElection.Candidates?.length === 0 && (
        <div className="mt-6 text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-gray-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">No candidates registered yet</p>
          <p className="text-gray-400 text-sm">Be the first to apply!</p>
        </div>
      )}
    </div>
  );
};

export default electionCandidates;
