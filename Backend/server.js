const express = require('express')
const cors = require('cors')
const connectToDB = require('./configs/mongodb.config')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes')
const transitRoutes = require('./routes/transitRoutes')
const ratingRoutes = require('./routes/ratingRoutes')
const reportRoutes = require('./routes/reportRoutes')

const app = express()
app.use(express.json()) //to parse json req bodies

//app.use(cors())   // enabling cors for all routes, allowing cross-origin requests

app.use(cors({
    origin: 'https://safe-comm-transportation.vercel.app', 
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
    credentials: true // if using cookies/auth headers
}));


connectToDB()

//using routes
app.use('/auth',authRoutes)
app.use('/transit',transitRoutes)
app.use('/ratings',ratingRoutes)
app.use('/reports', reportRoutes)

const PORT = process.env.PORT || 5000;

app.get('/',(req,res) =>{
    try{
        res.status(200).json({message: 'safecomm is running...'})
    }
    catch(err){
        res.status(500).json({message: "Something went wrong"})
    }
})
// handling undefined routes
app.use((req,res) =>{
    try{
        res.status(404).json({message: 'This request is undefined'})
    }
    catch(err){
        res.status(500).json({message: "Something went wrong"})
    }
})

app.listen(PORT, () => {
   console.log("Server Started")
})
