import React, { useState, useCallback } from 'react';
import Counter from './counter/counter.js';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const center = {
  lat: -3.745,
  lng: -38.523,
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
  }, [])

  const onUnmount = useCallback((map) => {
    console.log('unMounted');
    setMap(null);
  }, [])


  return isLoaded ? (
    <GoogleMap
    mapContainerClassName="h-screen w-screen"
    center={center}
    zoom={10}
    onLoad={onLoad}
    onUnmount={onUnmount}>

    </GoogleMap>
  ):
  <></>
}

export default React.memo(Homepage);