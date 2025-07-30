import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Inline style for input fields
const inputStyle = {
  padding: "0.7rem",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "1rem",
  outline: "none",
  transition: "border 0.2s",
  background: "#f9fafb"
};

const Register = () => {
  const [Username, setUsername] = useState('');
  const [EmailId, setEmailId] = useState('');
  const [Password, setPassword] = useState('');
  const [Phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/user/createUser", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ Username, EmailId, Password, Phone }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      alert("User created");
      navigate("/dashboard");
    } else {
      alert("User creation failed");
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
        }}>Register</h2>
        <form onSubmit={handleRegisterSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          <input
            id="Username"
            type="text"
            placeholder="Username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />
          <input
            id="EmailId"
            type="email"
            placeholder="Email"
            value={EmailId}
            onChange={(e) => setEmailId(e.target.value)}
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
          <input
            id="Phone"
            type="text"
            placeholder="Phone"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;