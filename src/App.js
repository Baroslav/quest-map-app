import { useJsApiLoader } from '@react-google-maps/api';
import { Map } from './components/Map/Map';
import './App.css';
import { useState } from 'react';

function App() {

  const [markers ,setMarkers] =  useState([])

  const center = {
    lat: 49.8390798360757,
    lng: 24.02734562167057
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDjxN3kY9QjjFg1mJJq7DYdt0tKaCFn2ds"
  })

  return (
    <div className="App">
      {isLoaded ? <Map center={center} markers={markers} setMarkers={setMarkers}/> : <h2>Loading...</h2>}
    </div>
  );
}

export default App;
