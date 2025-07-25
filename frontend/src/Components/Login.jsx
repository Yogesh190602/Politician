
import React, { use, useState } from 'react'

export default function Login() {

  const [EmailId, setEmailId] = useState('');
  const [Password, setPassword] = useState('');

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ EmailId, Password }),
      });


      const data = await response.json();

      console.log(data);
      alert(data.message);
  }   

  catch (error) {
    console.error(error);
  }
}

  return (
    <div>

      

      <form onSubmit={handleSubmit}>

        <input id='EmailId' type="email" placeholder='Email' value={EmailId} onChange={(e) => setEmailId(e.target.value)}/>

        <input id='Password' type="password" placeholder='Password' value={Password} onChange={(e)=> setPassword(e.target.value)}/>

        <button type='submit'>Login</button>

      </form>
        
    </div>
  )
}


