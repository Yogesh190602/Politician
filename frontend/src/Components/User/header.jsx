// import { useState, useEffect } from "react";

// const Dashboard = () => {
//   const [users, setUsers] = useState({});

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/user/profile", {
//           method: "GET",
//           credentials: "include",
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setUsers(data);
//         } else {
//           console.log("failed to fetch user data");
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   return (
//     <div>
//       <div>
//         <p>Welcome: {users.Username}</p>
//         <p>{users.role}</p>
//       </div>

//     </div>
//   );
// };

// export default Dashboard;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      Cookies.remove("token");
      setUsers({});
      navigate("/login");
      alert("Logged out successfully");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        {/* User Profile Section */}
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl font-bold">
              {users.Username ? users.Username.charAt(0).toUpperCase() : "U"}
            </span>
          </div>

          {/* User Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome, {users.Username || "User"}
            </h2>
            <div className="flex items-center mt-1">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  users.role === "User"
                    ? "bg-red-100 text-red-800 border border-red-200"
                    : "bg-blue-100 text-blue-800 border border-blue-200"
                }`}
              >
                {users.role || "User"}
              </span>
            </div>
          </div>
        </div>

        

        {/* Status Indicator */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600 font-medium">Online</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow mt-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
