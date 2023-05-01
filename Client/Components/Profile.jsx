import React, { useEffect } from 'react';
import { Avatar } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';

// profile picture
// username
// number of sightings
// favorite rat
// user since

export default function Profile() {
  const currentState = useSelector((state) => state.user);
  // use effect on load
  useEffect(() => {
    // ADD FETCH REQUEST ONCE GET USER IS IMPLEMENTED
    

  },[currentState])

  return (
    <div className="flex flex-col p-8 bg-blue-100 shadow justify-evenly py-20 items-center h-screen w-screen">
      <h1 className="text-5xl text-gray-600">Profile</h1>
      <Avatar className="p-5" rounded={true} size="xl"/>
      <h1 className="text-2xl text-gray-600">Username: {currentState.username}</h1>
      <h1 className="text-2xl text-gray-600">Favorite Rat: {currentState.favorite_rat}</h1>
      <h1 className="text-2xl text-gray-600">Number of Sightings: {currentState.number_sightings}</h1>
      <h1 className="text-2xl text-gray-600">Created At: {currentState.created_at}</h1>
      <a href={'/homepage'} className="flex border bg-col2 shadow rounded-xl p-2 w-1/12 justify-center"><p>Back</p></a>
    </div>
  );
};