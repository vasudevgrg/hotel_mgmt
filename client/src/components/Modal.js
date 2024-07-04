import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Modal = ({startDate, endDate, hotel_id, location, setShowModal}) => {
  console.log(hotel_id+ " "+ location+ startDate+ endDate);
const navigate=useNavigate();
const [numberOfRooms, setNumberOfRooms]= useState(0);
const [sizeOfRoom, setSizeOfRoom]= useState("");

  const handleBookHotel=()=>{
    fetch("http://localhost:5002/traveller/bookhotel",{
      method:"POST",
      body:JSON.stringify({
        startDate:startDate,
        endDate:endDate,
        location:location,
        hotel_id:hotel_id,
        numberOfRooms:numberOfRooms,
        sizeOfRoom:sizeOfRoom
      }),
      headers:{
        "Content-Type":"application/json"
      },
      credentials:'include'
    }).then(e=>e.json()).then(e=>{
      console.log(e);
      navigate("/");
    })
    setShowModal(false);
  }
  return (
   <>
   <div className='modal-wrapper'></div>
   <div className='modal-container'>
    <label>
      Number of Rooms:
      <input value={numberOfRooms} onChange={e=>setNumberOfRooms(e.target.value)}/>
     
    </label>
    <label>
      Size of Room:
      <select onChange={e=>setSizeOfRoom(e.target.value)}>
        <option value="large">Large</option>
        <option value="small">Small</option>
      </select>
      
     </label>
     <button onClick={handleBookHotel}>Book Hotel</button>
   </div>
   </>
  )
}

export default Modal