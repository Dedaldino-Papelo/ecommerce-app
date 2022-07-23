const jwt = require('jsonwebtoken')
const User = require('../models/usersModel')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('bearer'))
    {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_TOKEN)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Not Authorized, Token failed")
        }   
    }
    if(!token){
        res.status(401)
        throw new Error('Not Authorized, No Token')
    }
})

const admin = (req, res, next) => {
   if(req.user && req.user.isAdmin === "true"){
    next()
   } else {
    res.status(401)
    throw new Error("Sorry, you don't have permission")
   }
}

module.exports = {
    admin,
    protect
}
