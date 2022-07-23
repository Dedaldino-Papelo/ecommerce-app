var express = require('express')
var router = express.Router()
var User = require('../models/usersModel')
var bcrypt = require("bcryptjs")
var genarateToken = require("../utils/generateToken")
var { protect } = require('../middleware/authMiddleware')


//Register user Route
router.post("/api/users/register", async (req, res) => {
    const {name, email, password} = req.body
    //Hash the password bcrypt
    const hash = bcrypt.hashSync(password)
    const userExists = await User.findOne({email})
    //check if the email exists
    if(userExists){
       return res.status(401).json({message: "user already exists"})
    }
    const user = await User.create({
        name,
        email,
        password: hash,
    })
    if(user){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: genarateToken(user._id)
        })
    } else {
        res.status(401).json({message: "invalid user data"})
    }
   
 })
 
//login user route
router.post("/api/users/login", async (req, res) => {
    const { password, email } = req.body
    //find user by email
    const user = await User.findOne({ email })

    if (user && (await user.matchpassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: genarateToken(user._id)
        })
    } else {
        res.status(401).json({message: 'Invalid Email or Password'}) 
    } 
})

//Profile Route => This is a Procteted route must have a token to get in
router.get("/api/users/profile", protect, async(req,res) => {
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

//update user profile
router.put('/api/users/profile', protect, async(req,res) => {
    const user = await User.findById(req.user._id)
    if(user){
       user.name = req.body.name || user.name
       user.email = req.body.email || user.email

       if(req.body.password){
           const hash = bcrypt.hashSync(req.body.password)
           user.password = hash
       }

       const updateUser = await user.save()
       
       res.json({
        _id: updateUser.id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        token: genarateToken(user._id)
    })
    console.log(updateUser)
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

module.exports = router
