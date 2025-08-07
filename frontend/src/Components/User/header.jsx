import { useState, useEffect } from "react";

const Dashboard = () => {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/user/profile", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.log("failed to fetch user data");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      <div>
        <p>Welcome: {users.Username}</p>
        <p>{users.role}</p>
      </div>


    </div>
  );
};

export default Dashboard;