var mongoose = require('mongoose')
var bcrypt = require("bcryptjs")

var userSchema = mongoose.Schema({
     name:{
         type: String,
     },
     email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        unique: true
    },
    isAdmin:{
        type: String,
        default: false
    }

}, {timestamp: true})

userSchema.methods.matchpassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}  

module.exports = mongoose.model("User", userSchema)