const ReportModel = require('../models/report')
const RatingModel = require('../models/rating')

// function to submit a new report
const addReport = async (req, res) => {
  try {
    const { routeName, description, safetyScore } = req.body
    
    const userId = req.user.userId // getting user id from auth middleware

    // creating a  report object
    const newReport = new ReportModel({
      routeName,
      userId,
      description,
    })

    // saving report to database
    await newReport.save()

     // if rating is provided, create rating document
    if (safetyScore) {
      const newRating = new RatingModel({
        routeName,
        userId,
        safetyScore,
        comment: description||'' // or allow separate comment field
      })
      await newRating.save()
    }

    // sending  response
    res.status(201).json({ message: 'report submitted successfully' })
  }
  catch(err) {
    res.status(500).json({ message: 'unable to submit report' })
     res.status(500).json({ message: err.message || 'unable to submit report/rating' })
  }
}

//function to fetch reports for the logged in user
const getUserReports = async(req,res) =>{
  try{
    const userId = req.user.userId // getting user id from auth middleware
    // fetching reports of this user
    const reports = await ReportModel.find({ userId }).populate('userId', 'username email')
    // sending reports to client
    res.status(200).json({reports})
  }
  catch(err){
    res.status(500).json({message: 'unable to fetch user reports'})
  }
}

// function to fetch all reports for admin review
const getAllReports = async (req, res) => {
  try {
    // fetching all reports from database
    const reports = await ReportModel.find({}).populate('userId', 'username email')

    // sending reports data to client
    res.status(200).json({ reports })
  }
  catch(err) {
    res.status(500).json({ message: 'unable to fetch reports' })
  }
}

module.exports = { addReport,getUserReports, getAllReports }