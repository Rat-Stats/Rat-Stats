import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

  return (
      <div className="flex flex-row justify-around w-full">
        <p className="text-gray-600 font-bold">Lat: <span className="font-normal">{lat.toFixed(2)}</span></p>
        <p className="text-gray-600 font-bold">Lng: <span className="font-normal">{lng.toFixed(2)}</span></p>
      </div>
  )
}