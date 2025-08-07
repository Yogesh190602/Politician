import { useState, useEffect } from "react";

const electionWinner = () => {
  const [latestElection, setLatestElection] = useState(null);

  const [selectedWinner, setSelectedWinner] = useState("");

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

  const handleSetWinner = async () => {
    if (!selectedWinner) return alert("Select a winner");
    try {
      const res = await fetch(
        `http://localhost:5000/admin/setWinner/${latestElection._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Winner: selectedWinner }),
        }
      );
      const data = await res.json();
      alert(data.message);
      fetchLatestElection();
    } catch (err) {
      console.error("Error setting winner:", err);
    }
  };

  return (
    <div>
     

      { latestElection?.Candidates?.length > 0 && (
        <div className="mt-6 p-4 bg-green-50 rounded">
          <h2 className="text-lg font-bold mb-2">Set Winner</h2>
          <select
            value={selectedWinner}
            onChange={(e) => setSelectedWinner(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">-- Select Winner --</option>
            {latestElection?.Candidates?.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleSetWinner}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
          >
            Confirm Winner
          </button>
        </div>
      )}

      {latestElection?.Winner && (
        <div className="mt-4 p-3 bg-yellow-100 rounded">
          🏆 <strong>Winner:</strong> {latestElection.Winner}
        </div>
      )}
    </div>
  );
};

export default electionWinner;
