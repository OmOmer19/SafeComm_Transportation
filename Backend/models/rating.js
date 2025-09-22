const mongoose = require('mongoose')

// defining schema for route ratings
const ratingSchema = new mongoose.Schema({
  routeName: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  safetyScore: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String
  }
},
{
  timestamps: true // storing createdAt and updatedAt automatically
})

const RatingModel = mongoose.model('Rating', ratingSchema)

module.exports = RatingModel
