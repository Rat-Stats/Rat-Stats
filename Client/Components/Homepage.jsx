import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, InfoWindow, Marker } from '@react-google-maps/api';
import { Avatar } from 'flowbite-react';
import SightingForm from './SightingForm.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_LOCATION, UPDATE_USER } from '../Slices/sightingSlice';

import {
  updateUser,
  updatePassword,
  updateSightings,
  updateProfile_Picture,
  updateFavorite_Rat,
  updateCreated_At,
} from '../Slices/userSlice'

const center = {
  lat: 40.747749,
  lng: -73.993474,
}

function Homepage() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.MAPS_API,
  })
  const Navigate = useNavigate();

  // state for the google map
  const [map, setMap] = useState(null);
  const [info, setInfo] = useState(false);
  const [infoLocation, setInfoLocation] = useState({ lat: 0, lng: 0 })

  // state for the markers
  const [markerList, setMarkerList] = useState([])

  // get password and username from redux state
  const dispatch = useDispatch();
  const password = useSelector((state) => state.user.password);
  const username = useSelector((state) => state.user.username);
  const ssid = useSelector((state) => state.user.ssid);

  /**
   * Google Maps onload and onunmount functions
   */
  // Functionality when map loads. Unique to maps api
  const onLoad = useCallback((map) => {
    // get and load map instance
    console.log('loaded');
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
    //map.controls[google.maps.ControlPosition.TOP_CENTER].push(MapControl());
  }, [])

  // functionality when map dismounts. Unique to maps api
  const onUnmount = useCallback((map) => {
    console.log('unMounted');
    setMap(null);
  }, [])

  /**
   * UseEffect to create a new user if the user doesn't already exist in the prisma
   * db
   */
  useEffect(() => {
    // get user, if user exists, store in state, otherwise create user before
    // storing in state
    (async() => {
      try{
        const getUser = await fetch('/sql/user?' + new URLSearchParams({
          username:username
        }), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        const data = await getUser.json();
        if (data === null) {
          // create user
          try {
            const createUser = await fetch('/sql/user', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: username,
                ssid: ssid,     // authentication purposes, unsure how it works
              })
            })
            // add create user info to redux
            const data = await createUser.json();
          }
          catch (err) {
            console.log(err);
            console.log('error creating user in db')
          }
        }
        dispatch(updateSightings(data.number_sightings))
        dispatch(updateProfile_Picture(data.profile_picture))
        dispatch(updateFavorite_Rat(data.favorite_rat))
        dispatch(updateCreated_At(data.created_At));
      }
      catch (err) {
        console.log(err);
        console.log('error fetching user from db');
      }
    })();
  },[])

  /**
   * 
   * @param {*} e the event info of the mouse click
   * https://developers.google.com/maps/documentation/javascript/examples/event-click-latlng
   * Will return different events based on if the user clicked on a random point,
   * or if they clicked on one of our markers
   */
  const handleMouseClick = (e) => {
    const location = e.latLng.toJSON(); // location of the mouse click
    setInfo(true);
    setInfoLocation(location);

    // update this information in redux
    dispatch(UPDATE_LOCATION(location));
  }


  // use effect to update the user in sightings slice once homepage is reached
  useEffect(() => {
    // create markerList by fetching all the sightings from the database,
    // and populating them into marker objects
    fetch('/sql/sighting/all') 
      .then((response) => response.json())
      .then((data) => {
        // Create marker objects for fetched sightings
        const markers = data.map((sighting) => (
          <Marker
            key={sighting.id}
            position={{ lat: sighting.lat, lng: sighting.lng }}
            icon={
              {
                url: 'https://i.ibb.co/TR1B5G5/My-project-2.png',
                // scaledSize: new window.google.maps.Size(100, 100)
              }
            }
            onClick={() => handleMarkerListClick(sighting.id)}
          />
        ));

        //update marker list state with the created markers
        // setMarkerList(markers);
        setMarkerList(
          data.map((sighting) => (
            <Marker
              key={sighting.id}
              position={{ lat: sighting.lat, lng: sighting.lng }}
              icon={{
                url: 'https://i.ibb.co/TR1B5G5/My-project-2.png',
                anchor: new window.google.maps.Point(16, 16), 
                origin: new window.google.maps.Point(0, 0),
                scaledSize: new window.google.maps.Size(80, 48), 
              }}
              onClick={() => handleMarkerListClick(sighting.id)}
            />
          ))
        );
      })
      .catch((error) => {
        console.error('Error fetching sightings:', error);
      });
  }, []);

function handleMarkerListClick(e) {
  console.log(e);
  // TODO
  // when it's clicked on, look in the database for a specific position
}

const addToMarkerList = (position) => {
  const newMarker = <Marker
    key={JSON.stringify(position)}
    position={position}
    icon={
      {
        url: 'https://i.ibb.co/TR1B5G5/My-project-2.png',
        scaledSize: new window.google.maps.Size(200, 100)
      }
    }
    onClick={handleMarkerListClick}
  ></Marker>
  setMarkerList(current => [...current, newMarker]); // adds a new marker to the list
}


return isLoaded ? (
  <div className="flex flex-col justify-center items-center h-screen w-screen p-10 py-3">
    {/*Header */}
    <div className="flex flex-row w-screen h-1/6 justify-between items-end p-8 py-5">
      <h1 className="text-4xl text-gray-600">Welcome to Rat Stats!</h1>
      <div className="flex">
        <Link to={'/profile'}>
          <Avatar className="px-10" rounded={true} size="md" />
        </Link>
      </div>
    </div>

    {/**Uncomment and comment out googlemap stuff in order to run without
       * getting charged for api access
       */}
    {/* <div className="container border border-gray-700 shadow h-full w-screen">
        <div>
          <SightingForm/>
        </div>
      </div> */}
    {/** Box holding the google maps stuff */}
    <div className="container border border-gray-700 shadow h-full w-screen">
      <GoogleMap
        mapContainerClassName="h-full w-full"
        center={center}
        zoom={5}
        onLoad={onLoad}
        onUnmount={onUnmount}
        clickableIcons={false}
        onClick={handleMouseClick}>
        {markerList}
        {info && <InfoWindow
          key={`${infoLocation.lat}-${infoLocation.lng}`} // Add this line
          position={infoLocation}>
            <div>
              <SightingForm username={username} addToMarkerList={addToMarkerList}/>
            </div>
          </InfoWindow>}
        </GoogleMap>
      </div>
    </div>
  ):
  <></>
}

export default React.memo(Homepage);
