const path = require('path')
const multer = require('multer')
const express = require('express');
const router = express();
const Product = require('../models/productModel')

//Mutlter Set Up
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
  })

  const upload = multer({ 
      storage:storage,
      fileFilter: function(req, file, cb){
        checkFileType(file, cb);
      }
    }) 

    function checkFileType(file, cb){
        // Allowed ext
        const filetypes = /jpeg|jpg|png|gif/;
        // Check ext
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        // Check mime
        const mimetype = filetypes.test(file.mimetype);
      
        if(mimetype && extname){
          return cb(null,true);
        } else {
          cb('Error: Images Only!');
        }
      }

    router.post("/upload/image", upload.single("image"), async(req,res) => {
      res.send(`${req.file.filename}`)
      })

    module.exports = router