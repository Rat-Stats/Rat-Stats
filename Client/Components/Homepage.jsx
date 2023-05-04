import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, InfoWindow, Marker } from '@react-google-maps/api';
import SightingForm from './SightingForm.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateLocation } from '../Slices/sightingSlice';

const center = {
  lat: 40.747749,
  lng: -73.993474 ,
}

function Homepage() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script', 
    googleMapsApiKey: process.env.MAPS_API,
  })

  const Navigate = useNavigate();
  // state for the google map
  const [map, setMap] = useState(null);
  const [postReqMade, setPostReqMade] = useState(false);
  const [infoLocation, setInfoLocation] = useState({lat: 0, lng: 0})
  // state for the markers to show up after you click
  // const [markerList, setMarkerList] = useState(newArr)
  const [markerList, setMarkerList] = useState([])

  // get password and username from redux state
  const dispatch = useDispatch();
  const password = useSelector((state) => state.user.password);
  const username = useSelector((state) => state.user.username);

  // Functionality when map loads. Unique to maps api
  const onLoad = useCallback((map) => {
    // get and load map instance
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
    //map.controls[google.maps.ControlPosition.TOP_CENTER].push(MapControl());

  }, [])

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, [])



  const handleMouseClick = async function (e) {
    const location = e.latLng.toJSON(); // location of the mouse click
    setPostReqMade(true);
    setInfoLocation(location);
    dispatch(updateLocation(location));
    try {
      const response = await fetch('/sql/rats', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({location: location}),
        })
        .then((data) => data.json()).then(data=> {

          const newArr = [];

          for (let i = 0; i < data.length; i++) {
            newArr.push([Number(data[i][1]),Number(data[i][0])])
          };

          setMarkerList(newArr);
          console.log('markerList', markerList);
        })
    } catch (error) {
        console.log(error)
    }
  }

  const mapOptions = {
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],
  };

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
    onClick={(e) => handleMarkerListClick(sighting.id, map)}
  ></Marker>
  setMarkerList(current => [...current, newMarker]); // adds a new marker to the list
}

  return isLoaded ? (
    <div className="flex flex-col justify-center items-center h-screen w-screen p-10 py-3">
      <div className="flex flex-row w-screen h-1/6 justify-between items-end p-8 py-5">
        <h1 className="text-4xl primary">There are over 2 million rats in New York City.  These are but a few of them...</h1>
        <div className="flex">
        <Link to={'/'} className="btn btn-primary"><p>Sign Out</p></Link>
        </div>
      </div>
      
      <div className="container border border-gray-700 shadow h-full w-screen">
        <GoogleMap
        options={mapOptions}
        mapContainerClassName="h-full w-full"
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        clickableIcons={false}
        onClick={handleMouseClick}>

        {markerList}

          {markerList.map(elem => {
          
          return (
            // console.log(typeof elem[0], typeof elem[1]);

          <Marker 
          
                key={elem[0]+elem[1]} 
                position= {{lat: elem[0], lng: elem[1]}}
                icon={
                  {url: 'https://i.ibb.co/TR1B5G5/My-project-2.png',
                  scaledSize: new window.google.maps.Size(150, 100)}

              }></Marker>
              
          )
              
              }) }

          {postReqMade && <InfoWindow
          key={`${infoLocation.lat}-${infoLocation.lng}`} // Add this line
          position={infoLocation}
          >
            <div>
              <SightingForm addToMarkerList={addToMarkerList}/>
            </div>
          </InfoWindow>}
        </GoogleMap>
      </div>
    </div>
  ):
  <></>
}

export default React.memo(Homepage);
