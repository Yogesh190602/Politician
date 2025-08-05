// import { useState, useEffect } from "react";

// const lastElection = () => {
//   const [lastelect, setLastelect] = useState([]);

//   useEffect(() => {
//     const getlastelectionDetails = async () => {
//       try {
//         const lastElection = await fetch(
//           "http://localhost:5000/admin/getlastelectionDetails",
//           {
//             method: "GET",
//             credentials: "include",
//           }
//         );

//         const data = await lastElection.json();
//         setLastelect(data.getLastElec);
//       } catch (error) {
//         console.log("unable to get last elections details", error);
//       }
//     };
//     getlastelectionDetails();
//   }, []);

//   return (
//     <div>
//       <h1>Last Elections</h1>
//       <div>
//         <ul>
//           {lastelect.map((last) => (
//             <li key={last._id}>
//               <p>
               
//                 Date: {new Date(last.Date).toLocaleDateString("en-GB")}
//               </p>
//               <p> Candidates: {last.Candidates}</p>
//               <p> Votes: {last.Votes}</p>
//               <p> Winner: {last.Winner}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default lastElection;



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

        const sorted = data.getElecDay.sort(
          (a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt)
        ).slice(1);

        setNextElec(sorted);
      } catch (err) {
        console.error("Unable to fetch next election details", err);
      }
    };
    getNextElection();
  }, []);

  return (
    <div>
      {nextElec.map((nextelection) => (
        <div key={nextelection._id}>
          <h1>last Elections</h1>
          <p>Date: {new Date(nextelection.Date).toLocaleDateString("en-GB")}</p>
          <p>Applied Candidates: {nextelection.Candidates}</p>
          
          <p>Winner: {nextelection.Winner}</p>
          <p>Votes: {nextelection.Votes}</p>
        </div>
      ))}
    </div>
  );
};

export default nextElectionDetails;
