import { useState, useEffect } from "react";

const ElectionVotes = () => {
  const [latestElection, setLatestElection] = useState(null);
  const [isElectionDay, setIsElectionDay] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [votedCandidate, setVotedCandidate] = useState("");

  const fetchLatestElection = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/getElectionDay");
      const data = await res.json();
      if (data.getElecDay?.length > 0) {
        const sorted = data.getElecDay.sort(
          (a, b) => new Date(b.Date) - new Date(a.Date)
        )[0];

        setLatestElection(sorted);

        const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
        const electionDate = new Date(sorted.Date).toISOString().split("T")[0];

        setIsElectionDay(today === electionDate);
      } else {
        setLatestElection(null);

        setIsElectionDay(false);
      }
    } catch (err) {
      console.error("Error fetching latest election:", err);
    }
  };

  useEffect(() => {
    fetchLatestElection();
  }, []);

  useEffect(() => {
    const votedId = localStorage.getItem("VotedElectionId");
    const votedCandidate = localStorage.getItem("VotedCandidate");

    if (latestElection && votedId === latestElection._id) {
      setHasVoted(true);
      setVotedCandidate(votedCandidate);
    } else {
      setHasVoted(false);
    }
  }, [latestElection]);

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

      const data = await res.json();
      if (data.message) {
        alert(data.message);
        localStorage.setItem("VotedElectionId", latestElection._id);
        localStorage.setItem("VotedCandidate", name);
        setHasVoted(true);
        fetchLatestElection();
      } else {
        alert("Failed to add vote.");
      }
    } catch (err) {
      console.error("Error adding vote:", err);
    }
  };

  return (
    <div className="p-4">
      {hasVoted && latestElection && (
        <p className="text-center text-gray-500">
          You have voted for {votedCandidate}.
        </p>
      )}

      {!hasVoted && (
        <>
          {!isElectionDay && (
            <p className="text-center text-gray-500">
              Voting will be available only on the election date.
            </p>
          )}

          {isElectionDay && latestElection?.Candidates?.length > 0 && (
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
        </>
      )}
    </div>
  );
};

export default ElectionVotes;
