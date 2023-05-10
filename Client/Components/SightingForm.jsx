import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  UPDATE_RAT,
  UPDATE_DESCRIPTION,
  UPDATE_USER
} from '../Slices/sightingSlice';

// import axios from 'axios';

export default function SightingForm({ username, addToMarkerList, setInfo}) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const sightingState = useSelector((state) => state.sighting);
  const { ratName, description } = sightingState;
  const { lat, lng } = sightingState.location;
  // const { userId } = sightingState.userName

  const userId = useSelector((state) => state.user.username);


  useEffect(() => {
    dispatch(UPDATE_USER(username));
  }, [dispatch, username]);

  async function onClick(e) {
    e.preventDefault();
    const sightingData = {
      user_name: userId,
      rat_name: ratName,
      lat: lat,
      lng: lng,
      description: description,
    };
    console.log('sightingData: ',sightingData)

    addToMarkerList({ lat, lng });

    try {
      const temp = await fetch('/sql/sighting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sightingData),
      });
      setInfo(false);
    } catch (error) {
      console.error(error);
    }
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
  );
}
