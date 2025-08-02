import { useState, useEffect } from "react";

const nextElectionDetails = () => {
  const [nextElec, setNextElec] = useState([]);

  useEffect(() => {
    const getNextElection = async () => {
      const nextElection = await fetch(
        "http://localhost:5000/admin/getnextelectionDetails",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await nextElection.json();
      setNextElec(data.getNextElec);
    };

    getNextElection();
  }, []);

  return (
    <div>
      <div>
        <h1>Next Election</h1>
      </div>
      <div>
        <ul>
          {nextElec.map((nextelection) => (
            <li key={nextelection._id}>
              <p>Date: {new Date(nextelection.Date).toLocaleDateString("en-GB")}</p>
              <p>Applied Candidates: {nextelection.Candidates}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default nextElectionDetails;
