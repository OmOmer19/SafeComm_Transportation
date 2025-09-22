const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//function to register a new user
const register = async(req,res) =>{
    try{
        const{username, email, password, role} = req.body

        // if already user
        const existingUser = await UserModel.findOne({email})
        if(existingUser){
            return res.status(400).json({message: 'user already exists'})
        }
        // hashing the password before saving
        const hashedPassword = await bcrypt.hash(password, 10)

        //creating a new user with hashed pass
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            role: role|| 'user'
        })

        //saving to db
        await newUser.save()

        //sending res
        res.status(201).json({message: 'user registered successfully'})
    }
    catch(err){
        console.error('Register Error:', err)
        res.status(500).json({message: 'something went wrong'})
    }
}

// function to login a user
const login = async(req,res) =>{
    try{
        const {email, password} = req.body

        //finding user by mail
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({ message: 'invalid credentials' })
        }

        // comparing given pass with hashed pass in db
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({ message: 'invalid credentials' })
        }

        //creating jwt joken with id and role
        const token = jwt.sign( {userId: user._id, role: user.role},process.env.JWT_SECRET,
                                {expiresIn:'1d'})
        
        // sending token back to client
        res.json({message: 'logged in successfully',token, role:user.role})
    }
    catch(err){
        res.status(500).json({ message: 'something went wrong' })
    }
}

module.exports = {register, login}