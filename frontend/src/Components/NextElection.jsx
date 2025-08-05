import { useState, useEffect } from "react";

const nextElectionDetails = () => {
  const [nextElec, setNextElec] = useState([]);

  useEffect(() => {
    const getNextElection = async () => {
      try {
        const nextElection = await fetch(
          "http://localhost:5000/admin/getElectionDay",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await nextElection.json();
        console.log("Next Election Data:", data.getElecDay);

        if (data.getElecDay?.length > 0) {
          const sorted = data.getElecDay.sort(
            (a, b) => new Date(b.Date) - new Date(a.Date)
          )[0];
          setNextElec(sorted);
        }

        // const sorted = data.getElecDay.sort(
        //   (a, b) => new Date(b.Date) - new Date(a.Date)
        // )[0];
        // // setNextElec(sorted);

        // setNextElec([sorted]);
      } catch (err) {
        console.error("Unable to fetch next election details", err);
      }
    };
    getNextElection();
  }, []);

  return (
    <div>
      {nextElec.map((election) => (
        <div>
          <h2>date : {new Date(election.Date).toLocaleDateString("en-GB")}</h2>
        </div>
      ))}

      {nextElec?.Candidates?.length > 0 && (
        <div>
          <h1>Applied Candidates</h1>
          {nextElec.Candidates.map((c) => (
            <div key={c._id}>
              <p>{c.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default nextElectionDetails;
