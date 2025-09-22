const express = require('express')
const { register, login } = require('../controllers/authController')

const router = express.Router()

// route for registering user
router.post('/register', register)

// route for logging in user
router.post('/login', login)

module.exports = router