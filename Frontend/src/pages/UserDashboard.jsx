import React, {useState, useEffect, useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api'
import { Card, Rate, Button,Input, message } from "antd";
import { useNavigate } from "react-router-dom";

//user dashboard component
function UserDashboard() {
    const { token } = useContext(AuthContext) // getting jwt token
    const [vehicles, setVehicles] = useState([]) // storing live transit vehicles
    const [selected, setSelected] = useState(null) // storing selected marker info
    const [rating, setRating] = useState(0) // storing star rating
    const [comment, setComment] = useState('') // storing comment text
    const [averageRating, setAverageRating] = useState(null) // for average rating
    
    // step 1: add mock vehicle data
const mockVehicles = [
    {
        id: 1,
        routeName: "Route A",
        status: "On Time",
        currentLocation: { lat: 28.6139, lng: 77.209 },
    },
    {
        id: 2,
        routeName: "Route B",
        status: "Delayed",
        currentLocation: { lat: 28.6200, lng: 77.210 },
    },
    {
        id: 3,
        routeName: "Route C",
        status: "On Time",
        currentLocation: { lat: 28.6100, lng: 77.215 },
    }
    ]

    // logout function
    const handleLogout = () => {
        setToken(null) // clearing token
        setUser(null) // clearing user info
        setRole(null) // clearing role
        navigate('/login') // redirecting to login
        message.success('Logged out successfully')
    }

    // loading google maps api
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY // api key from .env
    })

    // fetching live vehicle data from backend
    const fetchLiveVehicles = () => {
        axios.get('http://localhost:5000/transit/live-otd', {
            headers: { Authorization: `Bearer ${token}` } // sending jwt token
        })
        .then(res => {
            setVehicles(res.data.vehicles) // saving vehicles to state
        })
        .catch(err => {
            message.error('unable to fetch live vehicles') // showing error message
        })
    }

    // fetching data every 15 seconds
    useEffect(() => {
        setVehicles(mockVehicles)
        // fetchLiveVehicles() // initial fetch
        // const interval = setInterval(fetchLiveVehicles, 15000)
        // return () => clearInterval(interval) // cleaning interval on unmount
    }, [])

    // submitting rating and comment for selected vehicle/route
    const handleSubmitRating = async() => {
        if (!rating && !comment) {
            message.warning('please provide rating or comment') // basic validation
            return
        }

         axios.post('http://localhost:5000/transit/reports', {
                routeName: selected.routeName,
                description: comment,
                safetyScore: rating|| null
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res =>{
                 message.success('Your report and/or rating has been submitted');
                 setRating(0);    // reset rating
                 setComment('');  // reset comment
                 setSelected(null); // close info window
            })
            .catch(err =>{
                  message.error(err.response?.data?.message || 'unable to submit report/rating')
            })
        }
    

    // function to fetch average rating for a route
    const fetchAverageRating = (routeName) => {
    axios.get(`http://localhost:5000/rating/${routeName}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setAverageRating(res.data.averageRating))
    .catch(err => setAverageRating(null))
    }

    if (!isLoaded) return <div className="text-center mt-20 text-xl">Loading map...</div>

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-6">
            <div className="flex w-full justify-end mb-4">
                <Button type="primary" danger onClick={handleLogout}>Logout</Button>
            </div>
            <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">
                SafeComm Live Transit
            </h1>
            <Card className="w-full max-w-6xl p-4 shadow-2xl rounded-xl bg-white">
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '600px', borderRadius: '10px' }}
                    center={{ lat: 28.6139, lng: 77.209 }} // center map at Delhi
                    zoom={12}
                >
                    {vehicles.filter(v=> v.currentLocation)
                    .map(vehicle => (
                        <Marker
                            key={vehicle.id} // unique id for each vehicle
                            position={{ lat: vehicle.currentLocation.lat, lng: vehicle.currentLocation.lng }}
                            onClick={() => {
                                setSelected(vehicle);
                            fetchAverageRating(vehicle.routeName)} } // setting selected marker
                            title={vehicle.routeName}
                        />
                    ))}

                    {selected && (
                        <InfoWindow
                            position={{ lat: selected.currentLocation.lat, lng: selected.currentLocation.lng }}
                            onCloseClick={() => setSelected(null)}
                        >
                            <div className="text-sm font-medium">
                                <p>Route: {selected.routeName}</p>
                                <p>Status: {selected.status}</p>
                               
                                {averageRating !== null && (
                               <p className="text-sm mb-2">Average Rating: {averageRating.toFixed(1)} ⭐</p>
                                 )}

                                <Rate value={rating}
                                onChange={(value) => setRating(value)}
                                allowClear />

                                {/*comment box */}
                                <Input.TextArea rows={3}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Share your feedback or report" />

                                {/*submmit button */}
                                <Button type="primary" size="small" onClick={handleSubmitRating} className="mt-2">
                                    Submit
                                </Button>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </Card>
        </div>
    )
}

export default UserDashboard