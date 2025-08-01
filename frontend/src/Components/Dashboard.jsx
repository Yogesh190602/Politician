import { useState, useEffect } from "react";

const Dashboard = () => {

  const [user, setUser] = useState(null);

  useEffect(()=> {

    const fetchUserProfile = async () => {

      try{
      
      const response = await fetch("http://localhost:5000/user/profile", {
      method: "GET",
        credentials: "include",
      })

      if(response.ok) {
        const data = await response.json();
        setUser(data);
      }

      else{
        console.log("failed to fetch user data");
      }}
      catch(err){
        console.log(err);
      }
    }

    fetchUserProfile();

  }, [])

      

  
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>

        <h1 >Welcome {user?.Username }</h1>
        <p>change password</p>
        <button>Logout</button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <h1>Weath</h1>
          <p>Food</p>
          <p>Coins</p>
        </div>

        <div>
          <h1>Peoples in city</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard