import { useState, useEffect } from "react";

const lastElection = () => {
  const [lastelect, setLastelect] = useState([]);

  useEffect(() => {
    const getlastelectionDetails = async () => {
      try {
        const lastElection = await fetch(
          "http://localhost:5000/admin/getlastelectionDetails",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await lastElection.json();
        setLastelect(data.getLastElec);
      } catch (error) {
        console.log("unable to get last elections details", error);
      }
    };
    getlastelectionDetails();
  }, []);

  return (
    <div>
      <h1>Last Elections</h1>
      <div>
        <ul>
          {lastelect.map((last) => (
            <li key={last._id}>
              <p>
               
                Date: {new Date(last.Date).toLocaleDateString("en-GB")}
              </p>
              <p> Candidates: {last.Candidates}</p>
              <p> Votes: {last.Votes}</p>
              <p> Winner: {last.Winner}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default lastElection;
