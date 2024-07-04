import React, { useState } from 'react'
import HotelRegister from '../components/HotelRegister';
import TravellerRegister from '../components/TravellerRegister';
import Navbar from '../components/Navbar';

const Register = () => {
    const [val, setVal]= useState("");
    const [hotel, setHotel]=useState(false);
    const [traveller, setTraveller]= useState(false);
    const [select, setSelect]= useState(true);
  return (
   <>
   <Navbar/>
   
   {select && 
   <>
    Who are you?
    <label>
        A Hotel Owner:
        <input value="hotel" onChange={e=>{setHotel(true); setSelect(false);}} type='checkbox'/>
    </label>
    <label>
        A Traveller
        <input value="traveller" onChange={e=>{setTraveller(true); setSelect(false)}} type='checkbox'/>
    </label>
  </>}
   {
    hotel && 
    <HotelRegister/>
   }
   {
    traveller && <TravellerRegister/>
   }
   </>
  )
}

export default Register