// import { useState, useEffect } from "react";

// const nextElectionDetails = () => {
//   const [nextElec, setNextElec] = useState([]);

//   useEffect(() => {
//     const getNextElection = async () => {
//       try {
//         const nextElection = await fetch(
//           "http://localhost:5000/admin/getElectionDay",
//           {
//             method: "GET",
//             credentials: "include",
//           }
//         );

//         const data = await nextElection.json();

//         if (data.getElecDay?.length > 0) {
//           const sorted = data.getElecDay.sort(
//             (a, b) => new Date(b.Date) - new Date(a.Date)
//           )[0];
//           setNextElec(sorted);
//         }

//       } catch (err) {
//         console.error("Unable to fetch next election details", err);
//       }
//     };
//     getNextElection();
//   }, []);

//   return (
//     <div>
//       {nextElec&&(
//         <div>
//           <h2>date : {new Date(nextElec.Date).toLocaleDateString("en-GB")}</h2>
//         </div>
//       )}

//       {nextElec?.Candidates?.length > 0 && (
//         <div>
//           <h1>Applied Candidates</h1>
//           {nextElec.Candidates.map((c) => (
//             <div key={c._id}>
//               <p>{c.name}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default nextElectionDetails;


import { useState, useEffect } from "react";

const NextElectionDetails = () => {
  const [nextElec, setNextElec] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNextElection = async () => {
      try {
        setLoading(true);
        const nextElection = await fetch(
          "http://localhost:5000/admin/getElectionDay",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await nextElection.json();

        if (data.getElecDay?.length > 0) {
          const sorted = data.getElecDay.sort(
            (a, b) => new Date(b.Date) - new Date(a.Date)
          )[0];
          setNextElec(sorted);
        }
      } catch (err) {
        console.error("Unable to fetch next election details", err);
      } finally {
        setLoading(false);
      }
    };
    getNextElection();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading election details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {nextElec ? (
        <>
          {/* Election Date Card */}
          <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <h2 className="text-3xl font-bold">Next Election</h2>
                </div>
                <div className=" bg-opacity-20 rounded-lg px-6 py-3 inline-block">
                  <p className="text-2xl font-bold">
                    {new Date(nextElec.Date).toLocaleDateString("en-GB", {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Candidates Section */}
          {nextElec?.Candidates?.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Section Header */}
              <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-violet-400 to-purple-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">Applied Candidates</h3>
                      <p className="text-sm text-gray-600">
                        Total: <span className="font-medium text-violet-600">{nextElec.Candidates.length}</span> candidates registered
                      </p>
                    </div>
                  </div>
                  
                 
                </div>
              </div>

              {/* Candidates Grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {nextElec.Candidates.map((candidate, index) => (
                    <div
                      key={candidate._id}
                      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-violet-200 group"
                    >
                      {/* Candidate Number */}
                      <div className="flex  items-center  mb-3">
                        <div className="w-8  h-8 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="text-lg"><h4 className="font-semibold pl-2 text-gray-800 group-hover:text-violet-600 truncate">
                          {candidate.name}
                        </h4></div>
                      </div>

                      {/* Candidate Info */}
                      {/* <div className="space-y-2">
                        <h4 className="font-semibold text-gray-800 group-hover:text-violet-600 truncate">
                          {candidate.name}
                        </h4> */}
                        
                        <div className="flex items-center justify-between">
                          
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Registered
                          </span>
                        </div>
                      {/* </div> */}
                    </div>
                  ))}
                </div>

                
              </div>
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 11-4 0 2 2 0 014 0zM8 7l4-4 4 4m0 0v4a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Upcoming Election</h3>
            <p className="text-gray-500">No next election information is currently available.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NextElectionDetails;
