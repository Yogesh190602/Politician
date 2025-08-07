// import { useState, useEffect } from "react";

// const userList = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const getAllUsers = async () => {
//       try {
//         const allUsers = await fetch("http://localhost:5000/user/allUsers", {
//           method: "GET",
//           credentials: "include",
//         });

//         const data = await allUsers.json();

//         setUsers(data.users);
//       } catch (err) {
//         console.log("Unable to get all users", err);
//       }
//     };

//     getAllUsers();
//   }, []);

//   return (
//     <div>
//       <h1>Users</h1>

//       <ul>
//         {users.map((user) => (
//           <li key={user._id}>
//             <h2>{user.Username}</h2>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default userList;


import { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        setLoading(true);
        const allUsers = await fetch("http://localhost:5000/user/allUsers", {
          method: "GET",
          credentials: "include",
        });

        const data = await allUsers.json();
        setUsers(data.users);
      } catch (err) {
        console.log("Unable to get all users", err);
      } finally {
        setLoading(false);
      }
    };

    getAllUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">All Users</h2>
            <p className="text-gray-600 mt-1">
              Total: <span className="font-semibold text-violet-600">{users.length}</span> users
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-md">
            <span className="text-sm font-medium">Active Users</span>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      {users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {users.map((user, index) => (
            <div
              key={user._id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-violet-200 group"
            >
              {/* User Avatar */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.Username ? user.Username.charAt(0).toUpperCase() : 'U'}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-violet-600">
                    {user.Username || 'Admin'}
                  </h3>
                  
                </div>
              </div>

              {/* User Details */}
             
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-500">No users are currently registered in the system.</p>
        </div>
      )}

      
    </div>
  );
};

export default UserList;
