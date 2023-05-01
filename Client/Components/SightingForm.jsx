import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  UPDATE_RAT,
  UPDATE_DESCRIPTION,
  UPDATE_USER
} from '../Slices/sightingSlice';

export default function SightingForm ({username, addToMarkerList, marketListInfo}) {
  const dispatch = useDispatch();
  // this are selectors that we use with redux in order to grab the lattitude
  // and longitude stored in state
  const sightingState = useSelector((state) => state.sighting.location);
  const ratName = useSelector((state) => state.sighting.ratName);
  const description = useSelector((state) => state.sighting.description);
  const { lat, lng } = sightingState; // extracts them from state

  dispatch(UPDATE_USER(useSelector((state) => state.user.username)));

  async function onClick(e) {
    e.preventDefault(); // prevents the page from reloading
    
    // Do some database posting

    // const ratResponse = await fetch(`/rat/${ratName}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // const data = await ratResponse.json();
    // if (data === null) {
    //   const sendRatResponse = await fetch('')
    // }

    //   // try catch block to post sighting
    // try {
    //   const sightingResponse = await fetch('/rat',{
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       name: ratName,
    //       image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Rattus_norvegicus_1.jpg/220px-Rattus_norvegicus_1.jpg',
    //       description: description,
    //       alive: true,
    //     })
    //   })
    //   const data2 = await sightingResponse.json();
    //   console.log(data2);
    // }
    // catch {
    //   console.log('error, failed to post sighting')
    // }

    addToMarkerList({lat: lat, lng: lng})

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