import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();

  
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h1>Username</h1>
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



