import React, { useState, useCallback } from 'react';
import Counter from './counter/counter.js';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Avatar } from 'flowbite-react';

const center = {
  lat: 40.747749,
  lng: -73.993474 ,
}

const MapControl = () => {
  return (
    <button className="bg-blue-100">test</button>
  )
}

function Homepage() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script', 
    googleMapsApiKey: process.env.MAPS_API,
  })

  const [map, setMap] = useState(null);

  //
  const onLoad = useCallback((map) => {
    // get and load map instance
    console.log('loaded');
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
    //map.controls[google.maps.ControlPosition.TOP_CENTER].push(MapControl());
  }, [])

  const onUnmount = useCallback((map) => {
    console.log('unMounted');
    setMap(null);
  }, [])


  return isLoaded ? (
    <div className="flex flex-col justify-center items-center h-screen w-screen p-10 py-3">
      {/*Header */}
      <div className="flex flex-row w-screen h-1/6 justify-between items-end p-8 py-5">
        <h1 className="text-4xl text-gray-600">Welcome to Rat Stats!</h1>
        <div className="flex">
          <a href={'/createSighting'} className="border shadow rounded-xl bg-col2 p-2 self-center">Create Sighting</a>
          <a href={'/profile'}>
            <Avatar className="px-10" rounded={true} size="md"/>
          </a>
        </div>
        
      </div>
      
      <div className="container border border-gray-700 shadow h-full w-screen"></div>
      {/* <GoogleMap
      mapContainerClassName="h-full w-full"
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      clickableIcons={false}>
      </GoogleMap> */}
    </div>
  ):
  <></>
}

export default React.memo(Homepage);
