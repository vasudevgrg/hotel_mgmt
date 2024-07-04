import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Hotelcard from './Hotelcard';
import Modal from './Modal';
import FilterModal from './FilterModal';


const FilteredHotels = ({startDate, endDate}) => {
 const [showFilter ,setShowFilter]= useState(false);
    const filteredHotels= useSelector(e=>e.manageHotels);
    
  return (
   <>
   <button onClick={e=>setShowFilter(true)}> Show Filters</button>
   {
    showFilter && <FilterModal setShowFilter={setShowFilter}/>
   }
   {
    filteredHotels.map(e=>(
        <Hotelcard data={e} startDate={startDate} endDate={endDate} />
    ))
   }
   
   </>
  )
}

export default FilteredHotels