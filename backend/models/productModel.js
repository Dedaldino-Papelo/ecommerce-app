var mongoose = require('mongoose')

//Review Schema
var reviewShema = mongoose.Schema({

      name: {type: String },
      rating: {type: Number },
      comment: {type: String },
      user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
      },
      
}, {timestamp: true})

var productSchema = mongoose.Schema({
      user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
      },
      name:{
         type: String,
      },

      image:{
         type: String,
      },

      description:{
            type: String,
      },

      brand:{
            type: String,
      },

      price:{
            type: Number,
            default: 0
      },

      category:{
            type: String,
      },

      countInStock:{
            type: Number,
      },

      reviews: [reviewShema],

      rating:{
            type: Number,
            default: 0
      },

      numReviews:{
            type: Number,
            default: 0
      },
      cloudinary_id:{
            type: String
      }
    
     
},{timestamp: true})

module.exports = mongoose.model("Product", productSchema)