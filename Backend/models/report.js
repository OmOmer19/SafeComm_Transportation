const mongoose = require('mongoose')

// defining schema for  reports
const reportSchema = new mongoose.Schema({
  routeName: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
   type: {
            lat: Number,
            lng: Number
        },
    required: false
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'resolved'],
    default: 'pending'
  }
},
{
  timestamps: true // storing createdAt and updatedAt automatically
})

const ReportModel = mongoose.model('Report', reportSchema)

module.exports = ReportModel
