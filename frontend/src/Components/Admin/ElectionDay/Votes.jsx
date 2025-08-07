import { useState, useEffect } from "react";

const electionVotes = () => {
  const [latestElection, setLatestElection] = useState(null);

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
     
      <div className="p-4">

        { latestElection?.Candidates?.length > 0 && (
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
                  Vote
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
  );
};
export default electionVotes;
