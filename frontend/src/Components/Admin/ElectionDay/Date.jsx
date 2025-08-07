// import { useState } from "react";

// export default function nextElectionDate() {

//   const [date, setDate] = useState("");

//   const addDate = async () => {
//     const res = await fetch("http://localhost:5000/admin/addElectionDate", {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify({ Date: date }),
//     });
//      await res.json();
//     alert("Election date added successfully");
//     setDate("");
//   };

//   return (
//     <div>
      
//         <div>
//           <input
//             type="date"
//             placeholder="Enter Election Date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />

//           <button onClick={addDate }> Add Date</button>
//         </div>
//     </div>
//   );
// }
import { useState } from "react";

export default function NextElectionDate() {
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const addDate = async () => {
    if (!date) {
      setMessage("Please select a valid date");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const res = await fetch("http://localhost:5000/admin/addElectionDate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ Date: date }),
      });
      
      await res.json();
      setMessage("Election date added successfully!");
      setMessageType("success");
      setDate("");
    } catch (error) {
      setMessage("Failed to add election date. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Schedule New Election</h3>
        <p className="text-gray-600">Set the date for the next upcoming election</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="space-y-6">
          {/* Date Input Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Election Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-lg"
                min={new Date().toISOString().split('T')[0]}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Select a future date for the election
            </p>
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

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                setDate("");
                setMessage("");
              }}
              className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              disabled={loading}
            >
              Clear
            </button>
            
            <button
              onClick={addDate}
              disabled={loading || !date}
              className={`
                px-8 py-2 rounded-lg font-semibold text-white transition-all
                ${loading || !date
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl'
                }
              `}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Adding...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  <span>Add Election Date</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Information Card */}
      

      
    </div>
  );
}
