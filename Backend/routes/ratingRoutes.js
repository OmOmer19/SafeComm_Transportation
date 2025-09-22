const express = require('express')
//importing auth and role middlewares
const authenticate = require('../middlewares/authMiddleware')
const authorizeRoles = require('../middlewares/roleMiddleware')

const { addRating, getAverageRating } = require('../controllers/ratingController')

const router = express.Router()

// route to add a new rating
// only accessible to authenticated users (user and admin)
router.post('/', authenticate, authorizeRoles('user', 'admin'), addRating)

// route to get average rating for a specific route
// only accessible to authenticated users
router.get('/:routeName', authenticate, authorizeRoles('user', 'admin'), getAverageRating)

module.exports = router