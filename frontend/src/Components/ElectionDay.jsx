import { useState, useEffect } from "react";


export default function ElectionManager() {
  const [latestElection, setLatestElection] = useState(null);
  const [showDateInput, setShowDateInput] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [showCandidateInput, setShowCandidateInput] = useState(false);
  const [candidateName, setCandidateName] = useState("");
  const [candidatesList, setCandidatesList] = useState(false);
  const [showVotesList, setShowVotesList] = useState(false);
  

  const fetchLatestElection = async () => {
    try {
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
    }
  };

  useEffect(() => {
    fetchLatestElection();
  }, []);

  
  const handleAddDate = async () => {
    if (!newDate) return alert("Please select a date");
    try {
      const res = await fetch("http://localhost:5000/admin/addElectionDate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Date: newDate }),
      });
      await res.json();
      alert("Election date added!");
      setNewDate("");
      setShowDateInput(false);
      fetchLatestElection();
    } catch (err) {
      console.error("Error adding date:", err);
    }
  };

  const handleAddCandidate = async () => {
    if (!candidateName) return alert("Enter candidate name");
    if (!latestElection) return alert("No election found");

    try {
      const res = await fetch("http://localhost:5000/admin/applyCandidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          electionId: latestElection._id,
          candidateName,
        }),
      });
      await res.json();
      alert("Candidate added!");
      setCandidateName("");
      setShowCandidateInput(false);
      fetchLatestElection();
    } catch (err) {
      console.error("Error adding candidate:", err);
    }
  };


  const handleAddVote = async (name) => {
    try {
      const res = await fetch("http://localhost:5000/admin/addVotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          electionId: latestElection._id,
          candidateName: name,
        }),
      });
      await res.json();
      fetchLatestElection();
    } catch (err) {
      console.error("Error adding vote:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Election Manager</h1>

     
      {latestElection && (
        <div className="p-4 bg-gray-100 rounded">
          <p>
            <strong>Latest Election Date:</strong>{" "}
            {new Date(latestElection.Date).toLocaleDateString("en-GB")}
          </p>
        </div>
      )}

    
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowDateInput(!showDateInput)}
        >
          Add Next Election Date
        </button>
        {showDateInput && (
          <div className="mt-2 space-x-2">
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="border px-2 py-1 rounded"
            />
            <button
              onClick={handleAddDate}
              className="bg-green-500 text-white px-4 py-1 rounded"
            >
              Done
            </button>
          </div>
        )}
      </div>

   
      <div>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setShowCandidateInput(!showCandidateInput);
            setCandidatesList(!candidatesList);
          }}
        >
          Add Candidate
        </button>

        {candidatesList && latestElection && (
          <div className="mb-4">
            

            {showCandidateInput && (
              <div className="mt-2 space-x-2">
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="Candidate name"
                  className="border px-2 py-1 rounded"
                />
                <button
                  onClick={handleAddCandidate}
                  className="bg-green-500 text-white px-4 py-1 rounded"
                >
                  Add
                </button>
              </div>
            )}

            {candidatesList && latestElection?.Candidates?.length > 0 && (
              <div>
                 <h1>Applied Candidates</h1>
                {latestElection.Candidates.map((c) => (
                  <div key={c._id}>
                   
                    <p>{c.name}</p>
                  </div>
                ))}
              </div>
            )}



          </div>
        )}
      </div>

      {/* Step 3: Add Votes */}
      <div>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={() => setShowVotesList(!showVotesList)}  
        >
          
          Add Votes
        </button>

        {showVotesList && latestElection?.Candidates?.length > 0 && (
          <div className="mt-4 space-y-2">
            {latestElection.Candidates.map((c) => (
              <div
                key={c._id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>
                  
                  {c.name} - {c.votes} votes
                </span>

                <button
                  onClick={() => handleAddVote(c.name)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Vote{" "}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
