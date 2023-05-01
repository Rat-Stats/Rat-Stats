import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  UPDATE_RAT,
  UPDATE_DESCRIPTION,
} from '../Slices/sightingSlice';

export default function SightingForm () {
  const dispatch = useDispatch();
  // this are selectors that we use with redux in order to grab the lattitude
  // and longitude stored in state
  const sightingState = useSelector((state) => state.sighting.location);
  // const { lat, lng } = sightingState; // extracts them from state
  let lat = 80.3
  let lng = 30.3

  function onClick(e) {
    e.preventDefault(); // prevents the page from reloading
    console.log('Ive been clicked!!'); 
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-lg font-bold text-gray-600">Location:</h1>
      <div className="flex flex-row justify-around w-full">
        <p className="text-gray-600 font-bold">Lat: <span className="font-normal">{lat.toFixed(2)}</span></p>
        <p className="text-gray-600 font-bold">Lng: <span className="font-normal">{lng.toFixed(2)}</span></p>
      </div>
    
      <form className="flex flex-col">
        <input type="text" onChange={(e) => dispatch(UPDATE_RAT(e.target.value))} placeholder='Rat Name'></input>
        <input className="h-[150px]"type="text" onChange={(e) => dispatch(UPDATE_DESCRIPTION(e.target.value))} placeholder='Description'></input>
        <button className="border shadow text-gray-600" onClick={onClick}>Submit Sighting</button>
      </form>
    </div>
  )
}