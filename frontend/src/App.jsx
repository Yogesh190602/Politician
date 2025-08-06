import { Route, Routes } from "react-router-dom";

import Login from  "./Components/RegisterandLogin/Login.jsx"
import Register from "./Components/RegisterandLogin/Register.jsx";

import AdminDashboard from "./Components/Admin/AdminDashboard.jsx";


function App() {

  return (
    <div>

      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
      </Routes>
      
    </div>
  )
}

export default App


