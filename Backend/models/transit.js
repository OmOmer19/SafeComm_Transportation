const mongoose = require('mongoose')

// defining schema for transit vehicles
const transitSchema = new mongoose.Schema({
  vehicleId: {
    type: String,
    required: true,
    unique: true
  },
  routeName: {
    type: String,
    required: true
  },
  currentLocation: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  nextStop: {
    type: String
  },
  estimatedArrival: {
    type: Date
  },
  status: {
    type: String,
    enum: ['on_route', 'delayed', 'offline'],
    default: 'on_route'
  }
},
{
  timestamps: true // storing createdAt and updatedAt automatically
})

const TransitModel = mongoose.model('Transit', transitSchema)

module.exports = TransitModel