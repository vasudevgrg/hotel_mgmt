import React from 'react'

const Login = () => {
  const [username, setUsername]= useState("");
  const [password, setPassword]= useState("");

  const handleLogin=()=>{
    fetch("http://localhost:5002/login",{
      method:'POST',
      body:JSON.stringify({
        username: username,
        password: password
      }),
      headers:{
        "Content-Type":'application/json'
      },
      credentials:'include'
    })
  }

  return (
   <>
   Welcome to OYO
   <label>
    Username:
    <input onChange={e=>setUsername(e.target.value)}/>
   </label>

   <label>
    Password:
    <input onChange={e=>setPassword(e.target.value)}/>
   </label>
   <button onClick={handleLogin}>Login</button>
   </>
  )
}

export default Login