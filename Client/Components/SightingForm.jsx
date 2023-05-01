import React from 'react';
import { useDispatch } from 'react-redux';
import {
  UPDATE_RAT,
  UPDATE_DESCRIPTION,
} from '../Slices/sightingSlice';

export default function SightingForm () {
  const dispatch = useDispatch();

  function onClick(e) {
    console.log('Ive been clicked!!');  
  }

  return (
    <form className="flex flex-col">
      <input type="text" onChange={(e) => dispatch(UPDATE_RAT(e.target.value))} placeholder='Rat Name'></input>
      <input className="h-[150px]"type="text" onChange={(e) => dispatch(UPDATE_DESCRIPTION(e.target.value))} placeholder='Description'></input>
      <button className="border shadow text-gray-600" onClick={onClick}>Submit Sighting</button>
    </form>
  )
}