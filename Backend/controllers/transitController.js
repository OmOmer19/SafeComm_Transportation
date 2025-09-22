const TransitModel = require('../models/transit')
const axios = require('axios')
const GtfsRealtimeBindings = require('gtfs-realtime-bindings')

// function to get all transit vehicles for live tracking
const getLiveTransit = async (req, res) => {
  try {
    // fetching all transit vehicles from db
    const vehicles = await TransitModel.find({})

    // sending vehicles data to client
    res.status(200).json({ vehicles })
  }
  catch(err) {
    // sending error if something goes wrong
    res.status(500).json({ message: 'unable to fetch transit data' })
  }
}


// function to get estimated arrival for a specific route
const getEstimatedArrival = async (req, res) => {
  try {
    const { routeName } = req.params

    // fetching vehicle on given route
    const vehicle = await TransitModel.findOne({ routeName })

    if(!vehicle) {
      return res.status(404).json({ message: 'route not found' })
    }

    // sending estimated arrival time
    res.status(200).json({ routeName: vehicle.routeName, estimatedArrival: vehicle.estimatedArrival })
  }
  catch(err) {
    res.status(500).json({ message: 'unable to fetch estimated arrival' })
  }
}

const getLiveVehicles = async(req,res) =>{
  try{
    const API_KEY = process.env.DELHI_API_KEY // reding from.env
    console.log("DELHI_API_KEY", API_KEY)

     // url for fetching live vehicle protobuf from OTD
    const url = `https://otd.delhi.gov.in/api/realtime/VehiclePositions.pb?key=${API_KEY}`
    
    // fetching raw protobuf data from external api
    const response = await axios.get(url,{responseType:'arraybuffer'}) // using arraybuffer to get binary data
     console.log('response.data byte length:', response.data.byteLength || response.data.length)

    // converting arraybuffer to buffer for protobuf decoding
    const buffer = Buffer.from(response.data)

    // Decode protobuf safely
    let feed;
    try {
      feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(buffer);
    } catch (decodeError) {
      console.error("Protobuf decode failed:", decodeError);
      return res.status(500).json({ message: "Protobuf decode failed" });
    }
   
    console.log('feed.entity.length:', feed.entity.length)
    
   if (!feed.entity || feed.entity.length === 0) {
    return res.status(404).json({ message: 'No live vehicles at the moment' });
    }
    //extracting vehicles positions into an array
    const vehicles = feed.entity
      .filter(e => e.vehicle && e.vehicle.position)
      .map(e => ({
        id: e.id || 'unknown',
        routeId: e.vehicle.trip?.routeId || 'unknown',
        latitude: e.vehicle.position.latitude,
        longitude: e.vehicle.position.longitude,
        timestamp: e.vehicle.timestamp
      }))
     
    console.log('vehicles extracted:', vehicles.length)
    
    //sending vehicles to client
    res.status(200).json({vehicles})
  }
  catch(err){
    console.error('Fetch or decode error:', err)
    res.status(500).json({ message: 'unable to fetch live vehicles' })
  }
}

module.exports = { getLiveTransit, getEstimatedArrival, getLiveVehicles }