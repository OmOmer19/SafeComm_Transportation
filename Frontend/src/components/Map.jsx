import React from 'react'
// importing google map components
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'

//e map component that accepts props
function Map({ vehicles, selected, setSelected }) {

    // returning the google map container
    return (
        <GoogleMap
            mapContainerStyle={{ width: '100%', height: '600px', borderRadius: '10px' }} // styling map container
            center={{ lat: 28.6139, lng: 77.209 }} // centering map at delhi
            zoom={12} // setting default zoom
        >
            {vehicles.map(vehicle => ( // iterating over vehicles array
                <Marker
                    key={vehicle.id} // using unique id for marker
                    position={{ lat: vehicle.currentLocation.lat, lng: vehicle.currentLocation.lng }} // setting marker position
                    onClick={() => setSelected(vehicle)} // setting selected vehicle on click
                    title={vehicle.routeName} // showing route name on hover
                />
            ))}

            {selected && ( // checking if a marker is selected
                <InfoWindow
                    position={{ lat: selected.currentLocation.lat, lng: selected.currentLocation.lng }} // positioning info window
                    onCloseClick={() => setSelected(null)} // closing info window on click
                >
                    <div className='text-sm font-medium'>
                        <p>Route: {selected.routeName}</p> // showing route name
                        <p>Status: {selected.status}</p> // showing route status
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    )
}


export default Map
