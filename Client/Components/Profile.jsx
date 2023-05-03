import React, { useEffect, useState } from 'react';
import { Avatar } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export default function Profile() {
  const currentState = useSelector((state) => state.user);
  const [sightings, setSightings] = useState([]);
  const [sightingsComponents, setSightingsComponents] = useState([]);

  useEffect(() => {
    async function getAllUserSitings(username) {
      try {
        const response = await fetch('/sql/sighting?' + new URLSearchParams({
          username: username
        }));
        let data = await response.json();
        setSightings(curr => [...curr, ...data]);
      } catch (err) {
        console.log(err);
      }
    }
    getAllUserSitings(currentState.username);
  }, []);

  useEffect(() => {
    console.log(sightings);
    const temp = sightings.map((sighting, index) => (
      <div key={index} className="border shadow w-full flex flex-col justify-center">
        <p>Rat Name: {sighting.rat.name}</p>
        <div className ="flex flex-row justify-between px-10">
        <p>Lat: {sighting.lat.toFixed(2)}</p><p>Lng: {sighting.lng.toFixed(2)}</p>
        </div>
        
        <p>Description: {sighting.description}</p>
        <p>Time: {sighting.time}</p>
      </div>
    ));
    setSightingsComponents(temp);
  }, [sightings]);

  return (
    <div className="flex flex-col p-8 bg-blue-100 shadow justify-evenly py-20 items-center h-screen w-screen">
      <h1 className="text-5xl text-gray-600">Profile</h1>
      <Avatar img={currentState.profile_picture} className="p-5" rounded={true} size="xl"/>
      <h1 className="text-2xl text-gray-600">Username: {currentState.username}</h1>
      <h1 className="text-2xl text-gray-600">Favorite Rat: {currentState.favorite_rat}</h1>
      <h1 className="text-2xl text-gray-600">Number of Sightings: {currentState.number_sightings}</h1>
      <h1 className="text-2xl text-gray-600">Created At: {currentState.created_at}</h1>
      <h1 className="text-2xl text-gray-600">All User Sightings</h1>
      <div className="grid grid-flow-row-dense grid-cols-4 content-center justify-center items-center">
        {sightingsComponents}
      </div>
      <Link to="/homepage" className="flex border bg-col2 shadow rounded-xl p-2 w-1/12 justify-center">
        <p>Back</p>
      </Link>
    </div>
  );
};
