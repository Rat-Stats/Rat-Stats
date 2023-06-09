import React, { useEffect, useState } from 'react';
import { Avatar } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

// profile picture
// username
// number of sightings
// favorite rat
// user since

export default function Profile() {
  const currentState = useSelector((state) => state.user);
  const [sightings, setSightings] = useState([])
  const [sightingsComponents, setSightingsComponents] = useState([])
  // use effect on load
  useEffect(() => {
    // ADD FETCH REQUEST ONCE GET USER IS IMPLEMENTED
    console.log('ran');
    async function getAllUserSitings(user) {
      try{
        const response = await fetch('/sql/getallsightings',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username: user}),
        })
        let data = await response.json();
        setSightings(curr => [...curr, ...data.rows])
      }
      catch (err) {
        console.log(err);
      }
    }
    getAllUserSitings(currentState.username)
  },[])

  // Populates the sightings when the sighting request completes
  useEffect(() => {
    const temp = [];
    for (let i = 0; i < sightings.length; i++) {
      temp.push(
        <div className="border shadow w-full flex flex-col">
          <p>Rat Name: {sightings[i].rat_name}</p>
          <p>Location: {sightings[i].location}</p>
          <p>Description: {sightings[i].rat_description}</p>
        </div>
      )
    }
    setSightingsComponents(temp);
    console.log(sightingsComponents);
  },[sightings])

  return (
    <div className="flex flex-col p-8 bg-blue-100 shadow justify-evenly py-20 items-center h-screen w-screen">
      <h1 className="text-5xl text-gray-600">Profile</h1>
      <Avatar className="p-5" rounded={true} size="xl"/>
      <h1 className="text-2xl text-gray-600">Username: {currentState.username}</h1>
      <h1 className="text-2xl text-gray-600">Favorite Rat: {currentState.favorite_rat}</h1>
      <h1 className="text-2xl text-gray-600">Number of Sightings: {currentState.number_sightings}</h1>
      <h1 className="text-2xl text-gray-600">Created At: {currentState.created_at}</h1>
      <div>
        {sightingsComponents}
      </div>
      <Link to={'/homepage'} className="flex border bg-col2 shadow rounded-xl p-2 w-1/12 justify-center"><p>Back</p></Link>
    </div>
  );
};