import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Reuse the input style from Register
const inputStyle = {
  padding: "0.7rem",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "1rem",
  outline: "none",
  transition: "border 0.2s",
  background: "#f9fafb"
};

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
        credentials: "include"
      });

      if (response.ok) {

        const profileResponse = await fetch("http://localhost:5000/user/profile", {
          method: "GET",
          credentials: "include",
        });
        if (!profileResponse.ok) {
          alert("Failed to fetch user profile");
          return;
        }

        const data = await profileResponse.json();
        const role = data.role;
        
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
    }}>
      <div style={{
        background: "#fff",
        padding: "2.5rem 2rem",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        minWidth: "340px"
      }}>
        <h2 style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "#333",
          fontWeight: 600,
          letterSpacing: "1px"
        }}>Login</h2>
        <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          <input
            id="EmailId"
            type="email"
            value={EmailId}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder="Email"
            style={inputStyle}
          />
          <input
            id="Password"
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <button
            type="submit"
            style={{
              background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "0.8rem",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
          >
            Login
          </button>
        </form>
        <div style={{ marginTop: "1.2rem", textAlign: "center" }}>
          <span style={{ color: "#666", fontSize: "0.95rem" }}>Don't have an account?</span>
          <button
            onClick={() => navigate("/register")}
            style={{
              marginLeft: "0.5rem",
              background: "none",
              color: "#667eea",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.95rem",
              textDecoration: "underline"
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;