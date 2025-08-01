import { Route, Routes, Navigate } from "react-router-dom";
import Login from  "./Components/Login.jsx"
import Register from "./Components/Register.jsx"
import Dashboard from "./Components/Dashboard.jsx";
import AdminDashboard from "./Components/AdminDashboard.jsx";


function App() {

  return (
    <div>

      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
      </Routes>
      
    </div>
  )
}

export default App
