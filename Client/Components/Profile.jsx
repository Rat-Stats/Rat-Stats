import React, { useEffect, useState } from 'react';
import { Avatar } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export default function Profile() {
  const currentState = useSelector((state) => state.user);
  const [sightings, setSightings] = useState([]);
  const [sightingsComponents, setSightingsComponents] = useState([]);

  // changes if the profile has a profile photo, if they do, then it doesn't show input field
  const [displayImage, setDisplayImage] = useState(!currentState.profile_picture);
  const [displayUrl, setDisplayUrl] = useState('')
  const [displayFavorite, setDisplayFavorite] = useState(true);

  // image url
  const [imageUrl, setImageUrl] = useState(currentState.profile_picture);

  useEffect(() => {
    async function getAllUserSitings(username) {
      try {
        username="user1"
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
    setDisplayUrl(currentState.profile_picture)

    const temp = sightings.map((sighting, index) => (
      <div key={index} className="border shadow w-full flex flex-col items-center">
        <p>Rat Name: {sighting.rat.name}</p>
        <div className ="flex flex-row justify-between px-10">
        <p className="px-2">Lat: {sighting.lat.toFixed(2)}</p><p className="px-2">Lng: {sighting.lng.toFixed(2)}</p>
        </div>
        <p>Description: {sighting.description}</p>
        <p>Time: {sighting.time}</p>
      </div>
    ));
    setSightingsComponents(temp);
  }, [sightings]);

  async function handleSubmit() {
    try {
      const update = await fetch('/sql/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: currentState.username,
          profile_picture: displayUrl
        })
      })
      const data = await update.json();
      console.log(data);
  
      setDisplayImage(false);
      setImageUrl(data.profile_picture);
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    
    <div className="flex flex-col p-8 bg-blue-100 shadow  py-20 items-center h-screen w-screen">
      <h1 className="text-5xl text-gray-600">Profile</h1>
      <Avatar img={imageUrl} className="p-5" rounded={true} size="xl"/>
      {displayImage &&(
        <div className="flex flex-row"> 
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter profile picture url" 
          onChange ={(e) => setDisplayUrl(e.target.value)}
          ></input>
          <button className="border bg-gray-200 shadow rounded-l" onClick={handleSubmit}>Submit</button>
        </div>
      )}
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
