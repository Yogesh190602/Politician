import { useState, useEffect } from "react";

const electionWinner = () => {
  const [latestElection, setLatestElection] = useState(null);

  // const [selectedWinner, setSelectedWinner] = useState("");

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


  return (
    <div>
      {latestElection?.Winner && (
        <div className="mt-4 p-3 rounded">
          🏆 <strong>Your current Leader is</strong>  <span className="text-white p-2 rounded-xl bg-green-600 font-bold " >{latestElection.Winner}</span>
        </div>
      )}
    </div>
  );
};

export default electionWinner;
