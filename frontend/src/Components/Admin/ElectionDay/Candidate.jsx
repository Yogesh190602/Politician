import { useState, useEffect } from "react";

const electionCandidates = () => {
  const [latestElection, setLatestElection] = useState(null);
  const [candidateName, setCandidateName] = useState("");

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

  const handleApplyCandidate = async () => {
  
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
        fetchLatestElection(); 
      } else {
        alert("Failed to apply as candidate.");
      }
    } catch (error) {
      console.error("Error applying as candidate:", error);
    }
  };

  return (
    <div className="election-candidates">
      <h2>Apply for Election</h2>
      {latestElection && (
        <form onSubmit={handleApplyCandidate}>
          <div>
            <label>Candidate Name:</label>
            <input
              type="text"
              id="candidateName"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              required
            />
          </div>
          <button type="submit">Apply</button>
        </form>
      )}

      {latestElection?.Candidates?.length > 0 && (
        <div>
          <h3> Applied Candidates </h3>

          {latestElection.Candidates.map((candidate) => (
            <p key={candidate._id}>{candidate.name}</p>
          ))}
        </div>
      )}
    </div>
  );
};
export default electionCandidates;
