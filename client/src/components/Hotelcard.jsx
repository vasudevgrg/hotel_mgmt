import React, { useState } from 'react';
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux';
import { showModal,hotelId } from '../action';
import Modal from './Modal';

const Hotelcard = ({ data, startDate, endDate}) => {
    const [showChat, setShowChat] = useState(false);
    const [showModal, setShowModal]= useState(false);
    const hotel_id= useSelector(e=>e.manageHotelId);
    console.log(data);
const dispatch= useDispatch();
    const handleHotelBook = () => {
        dispatch(hotelId(data.id));
        
       setShowModal(true);
    };

    const toggleChat = () => {
        setShowChat(!showChat);
    };
console.log(data.Amenities);
    return (
        <>
        <div className='hotelcard'>
            <img src={data.hotel_pic} alt='Hotel' className='hotelcard-img' />
            <div className='hotelcard-info'>
                <h2>{data.name}</h2>
                <p>{data.address}</p>
                <div className='hotelcard-details'>
                    <span>Rating: {data.rating} / 5</span>
                    <span>Price: ${data.price} per night</span>
                    <span>Amenities: {data.Amenities.join(', ')}</span>
                </div>
                <button onClick={handleHotelBook} className='hotelcard-button'>Book Now</button>
                <button onClick={toggleChat} className='hotelcard-button'>Chat with Hotel</button>
                {/* {showChat && <Chat hotelId={data.id} />} */}
            </div>
        </div>
      { showModal && <Modal startDate={startDate} endDate={endDate} hotel_id={data.id} location={data.location} setShowModal={setShowModal} />}
        </>
    );
};



export default Hotelcard;
