import {useState, useEffect} from "react";

const electionDay = () => {
    const [ElecDay, setElecDay] = useState([]);

    useEffect(() => {
        const getElectionDay = async () => {
            try {
                const getElecDay = await fetch("http://localhost:5000/admin/getElectionDay", {
                    method: "GET",
                    credentials: "include",
                });
                const data = await getElecDay.json();
                
                
                const sorted = data.getElecDay.sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt))[0];
                
                console.log("latest", sorted);

                setElecDay([sorted]);
                
                
                
                
            }
            catch(error) {
                console.log("unable to get details", error);
            }
        };
        getElectionDay();
    }, []);

    return (
        <div>
            <h1>Election Day</h1>
            <div>
                <ul>
                    {ElecDay.map((election, index) => (
                        <li key={index}>

                            <h2>{new Date(election.Date).toLocaleDateString("en-GB")}</h2>
                            <p>Candidates {election.Candidates}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default electionDay
