import { useState, useEffect } from "react";

const userList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const allUsers = await fetch("http://localhost:5000/user/allUsers", {
          method: "GET",
          credentials: "include",
        });

        const data = await allUsers.json();

        setUsers(data.users);
      } catch (err) {
        console.log("Unable to get all users", err);
      }
    };

    getAllUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>

      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <h2>{user.Username}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default userList;
