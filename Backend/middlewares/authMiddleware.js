const jwt = require('jsonwebtoken')

//middleware function to verify jwt token and protect routes
const authenticate = (req,res,next) => {
    // getting token from headers 
    const authHeader = req.headers.authorization

    // if token is present
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message: 'authorization token missing'})
    }

    //extracting token string
    const token = authHeader.split(' ')[1]

    try{
        //verifying token using jwt secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // attaching user info to req object
        req.user = decoded

        // moving to next
        next()
    }
    catch(err){
        res.status(401).json({ message: 'invalid or expired token' })
    }
}

module.exports = authenticate