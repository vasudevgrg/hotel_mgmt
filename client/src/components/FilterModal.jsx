import React, { useState } from 'react';
import "../App.css";

const FilterModal = ({setShowFilter}) => {
const [price, setPrice]= useState(0);
    return (
    <>
    <div className='modal-wrapper' onClick={()=>setShowFilter(false)}></div>
    <div className='modal-container'>
    
      <h3>Filters</h3>
      <div className="filter-section">
        <h4>Price</h4>
        {price}
        <input type="range" min="0" max="1000" step="50" value={price} onChange={e=>setPrice(e.target.value)}/>
      </div>
      <div className="filter-section">
        <h4>Rating</h4>
        <div>
          <input type="checkbox" id="5-stars" name="rating" value="5" />
          <label htmlFor="5-stars">5 Stars</label>
        </div>
        <div>
          <input type="checkbox" id="4-stars" name="rating" value="4" />
          <label htmlFor="4-stars">4 Stars</label>
        </div>
        <div>
          <input type="checkbox" id="3-stars" name="rating" value="3" />
          <label htmlFor="3-stars">3 Stars</label>
        </div>
      </div>
   
    </div>
    </>
  )
}

export default FilterModal