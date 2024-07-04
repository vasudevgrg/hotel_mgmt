import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const HotelRegister = () => {
    const [name, setName]= useState("");
    const [location, setLocation]= useState("");
    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");
   const [roomno, setRoomno]= useState(0);
   const [price, setPrice]=useState(0);
   const [size, setSize]= useState("");
    const [file, setFile]= useState(null);
    const [rooms, setRooms]= useState([]);
    const [ratings, setRatings]= useState(0);
    const [amenity, setAmenity]= useState("");
    const [amenities, setAmenities]= useState([]);

    const CLOUD_NAME = "dpei9fenp";
    const API_KEY ='416562346876343';

    const navigate= useNavigate();

    const handleCookie=()=>{
        fetch("http://localhost:5002/hotel/checkcookie", {
            credentials:'include'
        }).then(e=>e.json()).then(e=>console.log(e));
    }

    const handleRegister=async ()=>{
        
       const r1= await fetch("http://localhost:5002/hotel/createhotel", {
            method:'post',
            body:JSON.stringify({
                name, location, username, password,rooms, ratings, amenities
            }),
            headers:{
            "Content-Type":"application/json"
            },
            credentials:'include'
        });

        const r2= await r1.json();
        const { timestamp, signature } =r2.signedUrl;
      const form = new FormData()
      form.append('file', file)
      const r3 = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload?api_key=${API_KEY}&timestamp=${timestamp}&signature=${signature}`,
        {
          method: 'POST',
          body: form,
        }
      )
      const r4 = await r3.json();
      console.log(r4);

      const r5= await fetch("http://localhost:5002/hotel/updateurl", {
        method:'POST',
        body:JSON.stringify({
            url:r4.secure_url
        }),
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'include'
      });

      const r6= await r5.json();
      console.log(r6);

      setUsername("");
      setPassword("");
      setFile(null);
      setRoomno(0);
      setPrice(0);
      navigate("/");
    }

    const handleAddRoom=()=>{
        console.log(rooms);
        setRooms([...rooms, {roomno:roomno, price:price, size:size}]);
        setRoomno(0);
        setPrice(0);
    }

    const handleAmenity=()=>{
        setAmenities(...amenities, amenity);
        setAmenity("");
    }
    
  return (
    <>
    <div className='hotelregister'>
    <label>
        Username:
        <input onChange={e=>setUsername(e.target.value)}/>
    </label>
    <label>
        Password:
        <input onChange={e=>setPassword(e.target.value)}/>
    </label>
    <label>
        Name of Hotel:
        <input onChange={e=>setName(e.target.value)}/>
    </label>
    <label>
        Hotel Photo:
        <input type='file' onChange={e=>setFile(e.target.files[0])}/>
    </label>
    <label>
        Location of Hotel:
        <input onChange={e=>setLocation(e.target.value)}/>
    </label>
    <label>
        Details of Number of Rooms:
        <div>
            <label>
                Room Number:
                <input onChange={e=>setRoomno(e.target.value)}/>
            </label>
            <label>
                Size:
                <select onChange={e=>setSize(e.target.value)}>
                    <option value='large'>Large</option>
                    <option value='small'>Small</option>
                </select>
            </label>
            <label>
                Price:
                <input onChange={e=>setPrice(e.target.value)}/>
            </label>
            <button onClick={handleAddRoom}>Add Another Room</button>
        </div>
    </label>
    
    <label>
        Ratings: 
        <select onChange={e=>setRatings(e.target.value)}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
        </select>
    </label>
    <label>
        Amenities:
        <input value={amenity} type='text' onChange={e=>setAmenity(e.target.value)}/>
        <button onClick={handleAmenity}> Add Amenity</button>
    </label>

    <button onClick={handleRegister}>Register Hotel</button>
    </div>
    <button onClick={handleCookie}>Check Cookie</button>
    </>
  )
}

export default HotelRegister