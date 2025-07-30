import { Route, Routes, Navigate } from "react-router-dom";
import Login from  "./Components/Login.jsx"
import Register from "./Components/Register.jsx"
import Dashboard from "./Components/Dashboard.jsx";


function App() {

  return (
    <div>

      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
      
    </div>
  )
}

export default App
