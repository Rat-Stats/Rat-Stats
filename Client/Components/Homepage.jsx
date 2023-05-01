import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import { Avatar } from 'flowbite-react';
import SightingForm from './SightingForm.jsx';

// for redux
import { useDispatch } from 'react-redux';
import {
  UPDATE_LOCATION,
  UPDATE_USER,
} from '../Slices/sightingSlice';
import { redirect } from 'react-router-dom';


const center = {
  lat: 40.747749,
  lng: -73.993474 ,
}

function Homepage() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script', 
    googleMapsApiKey: process.env.MAPS_API,
  })

  const [map, setMap] = useState(null);
  const [info, setInfo] = useState(false);
  const [infoLocation, setInfoLocation] = useState({lat: 0, lng: 0})

  const dispatch = useDispatch();

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
    // Fetch the current user from state, 
    //fetch('localhost:8080/oauth/login/isloggedin')
  },[])

  // will print out info window
  const infoLoad = infoWindow => {
    // console.log('info window', infoWindow);
  }


  return isLoaded ? (
    <div className="flex flex-col justify-center items-center h-screen w-screen p-10 py-3">
      {/*Header */}
      <div className="flex flex-row w-screen h-1/6 justify-between items-end p-8 py-5">
        <h1 className="text-4xl text-gray-600">Welcome to Rat Stats!</h1>
        <div className="flex">
          <a href={'/profile'}>
            <Avatar className="px-10" rounded={true} size="md"/>
          </a>
        </div>
        
      </div>
      
      <div className="container border border-gray-700 shadow h-full w-screen">
        <div>
          <SightingForm/>
        </div>
      </div>
      {/** Box holding the google maps stuff */}
      {/* <div className="container border border-gray-700 shadow h-full w-screen">
        <GoogleMap
        mapContainerClassName="h-full w-full"
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        clickableIcons={false}
        onClick={handleMouseClick}>
          {info && <InfoWindow
          key={`${infoLocation.lat}-${infoLocation.lng}`} // Add this line
          onLoad={infoLoad}
          position={infoLocation}>
            <div>
              <SightingForm />
            </div>
          </InfoWindow>}
        </GoogleMap>
      </div> */}
    </div>
  ):
  <></>
}

export default React.memo(Homepage);
