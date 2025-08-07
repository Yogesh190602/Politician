// import { useState, useEffect } from "react";

// const electionCandidates = () => {
//   const [latestElection, setLatestElection] = useState(null);
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

//   const handleApplyCandidate = async () => {
  
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
//       <h2>Apply for Election</h2>
//       {latestElection && (
//         <form onSubmit={handleApplyCandidate}>
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

const ElectionCandidates = () => {
  const [latestElection, setLatestElection] = useState(null);
  const [candidateName, setCandidateName] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

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
      setMessage("Failed to load election data");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestElection();
  }, []);

  const handleApplyCandidate = async (e) => {
    e.preventDefault();
    
    if (!candidateName.trim()) {
      setMessage("Please enter a valid candidate name");
      setMessageType("error");
      return;
    }

    if (!latestElection) {
      setMessage("No election available to apply for");
      setMessageType("error");
      return;
    }

    try {
      setSubmitting(true);
      setMessage("");
      const res = await fetch("http://localhost:5000/admin/applyCandidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          electionId: latestElection._id,
          candidateName: candidateName.trim(),
        }),
      });
      
      const data = await res.json();
      if (data.message) {
        setMessage("Candidate applied successfully!");
        setMessageType("success");
        setCandidateName("");
        fetchLatestElection();
      } else {
        setMessage("Failed to apply as candidate");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error applying as candidate:", error);
      setMessage("Error occurred while applying. Please try again.");
      setMessageType("error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading election data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {latestElection ? (
        <>
          {/* Election Info Card */}
          <div className="bg-gradient-to-r from-blue-500 mb-2 to-cyan-500 rounded-lg p-3 text-white ">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold mb-1">Current Election</h4>
                <p className="text-blue-100">
                  {new Date(latestElection.Date).toLocaleDateString("en-GB", {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="text-right">
                <div className="flex flex-col items-center bg-grey bg-opacity-20  rounded-lg px-4 py-2">
                  <p className="text-sm font-medium opacity-90">Registered Candidates</p>
                  <p className="text-2xl font-bold">{latestElection.Candidates?.length || 0}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          

            <form onSubmit={handleApplyCandidate} className="space-y-6">
              <div>
                <label className="block text-1xl font-bold text-gray-700 mb-3">
                  Apply with Your Name and Your Party Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="Enter Your Name and Your Party Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message Display */}
              {message && (
                <div className={`
                  p-4 rounded-lg border-l-4 
                  ${messageType === 'success' 
                    ? 'bg-green-50 border-green-400 text-green-700' 
                    : 'bg-red-50 border-red-400 text-red-700'
                  }
                `}>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {messageType === 'success' ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{message}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setCandidateName("");
                    setMessage("");
                  }}
                  className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium"
                  disabled={submitting}
                >
                  Clear
                </button>
                
                <button
                  type="submit"
                  disabled={submitting || !candidateName.trim()}
                  className={`
                    px-8 py-2 rounded-lg font-semibold text-white
                    ${submitting || !candidateName.trim()
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl'
                    }
                  `}
                >
                  {submitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Applying...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      <span>Apply Candidate</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Applied Candidates Section */}
          {latestElection?.Candidates?.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Section Header */}
              <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">Applied Candidates</h4>
                      <p className="text-sm text-gray-600">
                        Total: <span className="font-medium text-teal-600">{latestElection.Candidates.length}</span> candidates registered
                      </p>
                    </div>
                  </div>
                  <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                    Registration Active
                  </div>
                </div>
              </div>

              {/* Candidates Grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {latestElection.Candidates.map((candidate, index) => (
                    <div
                      key={candidate._id}
                      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-teal-200"
                    >
                      {/* Candidate Avatar and Number */}
                      <div className="flex items-center space-x-3 justify-center mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {candidate.name ? candidate.name.charAt(0).toUpperCase() : 'C'}
                        </div>
                        <h5 className="font-semibold text-gray-800 truncate">
                          {candidate.name}
                        </h5>
                   
                      </div>

                      {/* Candidate Info */}
                      <div className="space-y-2">
                        
                        <div className="flex items-center justify-center">
                         
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Registered
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                
              </div>
            </div>
          )}
        </>
      ) : (
        /* No Election State */
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 11-4 0 2 2 0 014 0zM8 7l4-4 4 4m0 0v4a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Election</h3>
            <p className="text-gray-500 mb-4">
              There is currently no active election available for candidate applications.
            </p>
            <p className="text-sm text-gray-400">
              Please set up an election date first before adding candidates.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectionCandidates;
