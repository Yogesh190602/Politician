import { Router, Routes } from "react-router-dom";
import login from  "./Components/Login.jsx"

function App() {

  return (
    <div>

      <Router>
        <Routes path="/" element={<Login />}/>
      </Router>
    </div>
  )
}

export default App
