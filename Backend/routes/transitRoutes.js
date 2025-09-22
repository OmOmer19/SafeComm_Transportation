const express = require('express')
//importing auth and role middlewares
const authenticate = require('../middlewares/authMiddleware')
const authorizeRoles = require('../middlewares/roleMiddleware')

const { getLiveTransit, getEstimatedArrival, getLiveVehicles } = require('../controllers/transitController')
const { addReport, getAllReports, getUserReports} = require('../controllers/reportController')

const router = express.Router()

//live transit route

// route to get all transit vehicles live
// only accessible to authenticated users (user and admin)
router.get('/live', authenticate, authorizeRoles('user', 'admin'), getLiveTransit)

// route to get estimated arrival of a specific route
// only accessible to authenticated users
router.get('/arrival/:routeName', authenticate, authorizeRoles('user', 'admin'), getEstimatedArrival)

// route to get  livevehicles 
router.get('/live-otd', authenticate, authorizeRoles('user', 'admin'), getLiveVehicles)
// only accessible to authenticated users


// -- REPORT ROUTES--------

// submit new safety report (user only)
router.post('/reports', authenticate, authorizeRoles('user'), addReport)

// fetch all reports (admin only)
router.get('/reports', authenticate, authorizeRoles('admin'), getAllReports)

// fetch logged-in user's reports (user only)
router.get('/reports/user', authenticate, authorizeRoles('user'), getUserReports)

module.exports = router