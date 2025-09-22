const express = require('express')
//importing auth and role middlewares
const authenticate = require('../middlewares/authMiddleware')
const authorizeRoles = require('../middlewares/roleMiddleware')

const { addReport, getAllReports } = require('../controllers/reportController')

const router = express.Router()

// route to submit a new unsafe situation report
router.post('/', authenticate, authorizeRoles('user', 'admin'), addReport)

// route to fetch all reports for admin review
// only accessible to admins
router.get('/', authenticate, authorizeRoles('admin'), getAllReports)

module.exports = router