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
  const [markerList, setMarkerList] = useState([
    [40.741, -73.99563563563456],
    [40.739, -73.97452654653465],
    [40.73, -73.92562463563564],
    [40.742, -73.93456563565346],
  ])

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


    // use GET request to populate screen with rats





  }, [])

  // functionality when map dismounts. Unique to maps api
  const onUnmount = useCallback((map) => {
    setMap(null);
  }, [])

  /**
   * 
   * @param {*} e the event info of the mouse click
   * https://developers.google.com/maps/documentation/javascript/examples/event-click-latlng
   * Will return different events based on if the user clicked on a random point,
   * or if they clicked on one of our markers
   */
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
        }).then((data) => data.json()).then(data=> {
          console.log('data', data)

          // not very DRY, but needs a way to iterate thru each pair in arr
          // and store in state.

          // for (let i = 0; i < data.length; i++) {
          //   const newMarker = <Marker 
          //   // key={JSON.stringify(data[i])} 
          //   draggable={true}
          //   position={{lat: Number(data[i][0]), lng: Number(data[i][1])}}
        
          //   ></Marker>
          //   setMarkerList(current => [...current, newMarker]); // adds a new marker to the list
          // };




        })
    } catch (error) {
        console.log(error)
    }
  }

  const addToMarkerList = (position) => {
    const newMarker = <Marker 
    key={JSON.stringify(position)} 
    position={position}
    icon={
      {url: 'https://i.ibb.co/TR1B5G5/My-project-2.png',
      scaledSize: new window.google.maps.Size(150, 100)}
    }
    // onClick={handleMarkerListClick}
    ></Marker>
    setMarkerList(current => [...current, newMarker]); // adds a new marker to the list
  }

  // use effect to update the user in sightings slice once homepage is reached
  useEffect(() => {

    for (let i = 0; i < markerList.length; i++) {
    const newMarker = <Marker 
    key={JSON.stringify(markerList[i])} 
    draggable={true}
    position={{lat: markerList[i][0], lng: markerList[i][1]}}

    // add drag and drop functionality to rats
    // drag resets location
    // double-click deletes it

    ></Marker>
    setMarkerList(current => [...current, newMarker]); // adds a new marker to the list
    // console.log('markerList', markerList)
  };

  // TODO: create markerList by fetching all the sightings from the database,
  // and populating them into marker object
},[])

  return isLoaded ? (
    <div className="flex flex-col justify-center items-center h-screen w-screen p-10 py-3">
      {/*Header */}
      <div className="flex flex-row w-screen h-1/6 justify-between items-end p-8 py-5">
        <h1 className="text-4xl text-gray-600">Welcome to Rat Stats!</h1>
        <div className="flex">
        <Link to={'/'} className="flex border bg-col2 shadow rounded-xl p-2 w-10 justify-center"><p>Sign Out</p></Link>
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
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        clickableIcons={false}
        onClick={handleMouseClick}>
          {markerList}
          {postReqMade && <InfoWindow
          key={`${infoLocation.lat}-${infoLocation.lng}`} // Add this line
          position={infoLocation}>
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
