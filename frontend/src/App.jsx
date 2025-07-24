import { Route, Routes, Navigate } from "react-router-dom";
import Login from  "./Components/Login.jsx"

function App() {

  return (
    <div>

      <Routes>
        <Route path="/" element={<Login/>}/>
      </Routes>
      
    </div>
  )
}

export default App
