import React, { useEffect, useState } from 'react';
import '../Profile.css'; 

const Profile = () => {
const [user, setUser]= useState("");
const [currentTrips, setCurrentTrips]= useState([]);
const [upcomingTrips, setUpcomingTrips]= useState([]);

//   const user = {
//     username: 'john_doe',
//     name: 'John Doe',
//     profilePic: '../assets/avatar.png',
//   };

//   const currentTrips = [
//     { id: 1, title: 'Trip to Paris', description: 'A wonderful trip to Paris...' },
//     { id: 2, title: 'Exploring Tokyo', description: 'Amazing adventures in Tokyo...' },
//   ];

//   const upcomingTrips = [
//     { id: 1, destination: 'New York', date: '2024-08-15' },
//     { id: 2, destination: 'London', date: '2024-09-10' },
//   ];

useEffect(()=>{
    fetch("http://localhost:5002/traveller/userinfo", {
        method:'GET',
        credentials:'include'
    }).then(e=>e.json()).then(e=>{setUser(e.user)}).catch(err=>console.log(err));

    fetch("http://localhost:5002/traveller/currenttrip",{
        credentials:'include'
    }).then(e=>e.json()).then(e=>setCurrentTrips(e.currTrips));
},[]);




  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src="../assets/avatar.png" alt="Profile Pic" className="profile-pic" />
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>@{user.username}</p>
        </div>
      </div>
      <div className="profile-content">
        <div className="current-trips">
          <h3> Trips</h3>
          <ul>
            {currentTrips.map(trip => (
              <li key={trip.id}>
                <h4>{trip.destination}</h4>
                <p>Start Date:{trip.startDate}</p>
                <p>End Date:{trip.endDate}</p>
              </li>
            ))}
          </ul>
        </div>
        {/* <div className="upcoming-trips">
          <h3>Upcoming Trips</h3>
          <ul>
            {upcomingTrips.map(trip => (
              <li key={trip.id}>
                <h4>{trip.destination}</h4>
                <p>Date: {trip.date}</p>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
