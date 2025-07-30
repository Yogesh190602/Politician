import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [EmailId, setEmailId] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ EmailId, Password }),
      });

      if (response.ok) {
        navigate("/dashboard");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleLoginSubmit}>
          <input
            id="EmailId"
            type="email"
            
            value={EmailId}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder="Email"
          />

          <input
            id="Password"
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </div>

      <div>
        <button onClick={() => navigate("/register")}>Register</button>
      </div>
    </div>
  );
};

export default Login;
