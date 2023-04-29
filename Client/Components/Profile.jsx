import React from 'react';
import { Avatar } from 'flowbite-react';

// profile picture
// username
// number of sightings
// favorite rat
// user since

export default function Profile() {
  return (
    <div className="flex flex-col p-8 bg-blue-100 shadow justify-evenly py-20 items-center h-screen w-screen">
      <h1 className="text-5xl text-gray-600">Profile</h1>
      <Avatar className="p-5" rounded={true} size="xl"/>
      <h1 className="text-2xl text-gray-600">Username</h1>
      <h1 className="text-2xl text-gray-600">Favorite Rat</h1>
      <h1 className="text-2xl text-gray-600">Number of Sightings</h1>
      <h1 className="text-2xl text-gray-600">Username</h1>
      <a href={'/homepage'} className="flex border bg-col2 shadow rounded-xl p-2 w-1/12 justify-center"><p>Back</p></a>
    </div>
  );
};