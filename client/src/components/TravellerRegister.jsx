import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const TravellerRegister = () => {
    const [name, setName]= useState("");
    const [password, setPassword]= useState("");
    const [username, setUsername]= useState("");

    const navigate= useNavigate();

    const handleTraveller=()=>{
        fetch("http://localhost:5002/traveller/createtraveller",{
            method:"POST",
            body:JSON.stringify({
                name, username, password
            }),
            headers:{
                "Content-Type":"application/json"
            },
            credentials:'include'
        }).then(e=>e.json()).then(e=>navigate("/"));
    }
  return (
   <>
   <label>
    Name:
    <input onChange={e=>setName(e.target.value)}/>
   </label>
    <label>
        Username:
        <input onChange={e=>setUsername(e.target.value)}/>
    </label>
    <label>
        Password:
        <input onChange={e=>setPassword(e.target.value)}/>
    </label>
    <button onClick={handleTraveller}>Add Traveller</button>
   </>
  )
}

export default TravellerRegister