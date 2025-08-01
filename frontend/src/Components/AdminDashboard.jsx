import { useState, useEffect } from "react";
import { electionDay } from "../../../backend/controllers/adminControllers";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const [elections, setElections] = useState([]);

  useEffect(() => {
    const profile = async () => {
      try {
        const profileResponse = await fetch(
          "http://localhost:5000/user/allUsers",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await profileResponse.json();
        setUsers(data.users);
      } catch (err) {
        console.log(err);
      }
    };
    profile();
  }, []);

  useEffect(() => {
    const getLast = async () => {
      try {
        const lastRes = await fetch(
          "http://localhost:5000/admin/lastElection",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (lastRes.ok) {
          const data = await lastRes.json();
          setElections(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getLast();
  }, []);


  return (
    <div>
      <h1>Admin</h1>

      <div>
        <h1>All users</h1>
        {users.map((user, index) => (
          <div key={index}>
            <p> {user.Username}</p>
          </div>
        ))}
      </div>

      <div>
        <h1>last election</h1>
      </div>    

      {elections.map((election, index) => (
        <div key={index}>
          <p> {election.Candidates}</p>
        </div>
      ))}



    </div>

    
  );
};

export default AdminDashboard;
