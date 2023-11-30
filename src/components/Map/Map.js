import React, { useRef,useEffect } from 'react';
import {GoogleMap, Marker} from '@react-google-maps/api'
import {addDoc,onSnapshot} from "firebase/firestore";
import {questCollection} from '../../firebase'
import './Map.css'

const containerStyle = {
    width: '700px',
    height: '700px'
  };
  
  const defaultOptions = {
    panControl: true,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    clickableIcons: false,
    keyboardShortcuts: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    fullscreenControl: false
  };


export const Map = ({center,markers,setMarkers}) => {
    const mapRef = useRef(undefined)
    
    const onLoad = React.useCallback(function callback(map) {
        mapRef.current = map
      }, [])

      const onUnmount = React.useCallback(function callback(map) {
        mapRef.current = undefined
      }, [])

      const mapClick = (loc) => {
        const value = {
            lat : loc.latLng.lat(),
            lng : loc.latLng.lng()
        }

        const timestamp = new Date();

        setMarkers([...markers, { value, timestamp }]);
    }
    
    const addMarkersToDatabase = async () => {
        const markersData = markers.map((marker,index) => {
            const uniqueId = `Quest_${index + 1}`;
            const info = {
                location: marker.value,
                time : marker.timestamp
            }
            return {
                id:uniqueId,
                info
            }
            
        });
      
        try {
          await Promise.all(markersData.map((data) => addDoc(questCollection, data)));
          console.log("Markers added to the database successfully!");
        } catch (error) {
          console.error("Error adding markers to the database: ", error);
        }
      };



    return (
        <div className='map_container'>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={mapClick}
            options={defaultOptions}
        >
            {markers.map((marker,index) => (
                <Marker key={index} position={marker.value} label={`${index + 1}`}/>
         ))}
       
        </GoogleMap>
                <button onClick={addMarkersToDatabase}>Save</button>
        </div>
    )
}