import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

export default function SightingForm ({addToMarkerList}) {
  const dispatch = useDispatch();
  // this are selectors that we use with redux in order to grab the lattitude
  // and longitude stored in state
  const sightingState = useSelector((state) => state.sighting.location);
  const { lat, lng } = sightingState; // extracts them from state

  async function onClick(e) {
    e.preventDefault(); // prevents the page from reloading
    
    // TODO: Post sighting to database
    const locationString = JSON.stringify({lat: lat, lng: lng})
    console.log('location', locationString)
    addToMarkerList({lat: lat, lng: lng})
  }

  const sendEmail = async (data) => {
    try {
      const response = await axios.post('/api/send-email', data);
      console.log('Email sent successfully!');
      console.log(response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  
  return (
      <a>congRATS, you found a rat Here is your rat.
      {/* <button     className={'invisible'} onClick={()=>{
        
        console.log("TEST SEND")
        
        sendEmail({
    to: 'henrymcgill@gmail.com',
    subject: 'Test email',
    message: 'This is a test email from my React app!'
  })}}>click to send</button> */}
      </a>
  )
}