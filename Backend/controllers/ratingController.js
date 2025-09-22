const RatingModel = require('../models/rating')

// function to add a new rating
const addRating = async (req, res) => {
  try {
    const { routeName, safetyScore, comment } = req.body
    const userId = req.user.userId // getting user id from auth middleware

    // creating a new rating document
    const newRating = new RatingModel({
      routeName,
      userId,
      safetyScore,
      comment
    })

    // saving rating to database
    await newRating.save()

    // sending response
    res.status(201).json({ message: 'rating added successfully' })
  }
  catch(err) {
    res.status(500).json({ message: 'unable to add rating' })
  }
}

// function to get average rating for a route
const getAverageRating = async (req, res) => {
  try {
    const { routeName } = req.params

    // aggregating ratings to calculate average safety score
    const ratings = await RatingModel.find({ routeName })

    if(ratings.length === 0) {
      return res.status(404).json({ message: 'no ratings found for this route' })
    }

    // calculating average
    const total = ratings.reduce((sum, r) => sum + r.safetyScore, 0)
    const average = total / ratings.length

    // sending average rating
    res.status(200).json({ routeName, averageRating: average })
  }
  catch(err) {
    // sending error if something goes wrong
    res.status(500).json({ message: 'unable to fetch ratings' })
  }
}

module.exports = { addRating, getAverageRating }