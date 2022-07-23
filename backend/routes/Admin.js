const express = require("express")
const {protect,admin}  = require("../middleware/authMiddleware")
const router = express()
const User = require("../models/usersModel")
const Product = require("../models/productModel")
const Orders = require('../models/orderModel')



//Get All the users from the DB
router.get("/admin/users", protect, admin, async(req,res) => {
    const user = await User.find({})
    res.json(user)
})

//Delete one user
router.delete("/admin/:id", async(req,res) => {
    const { id } = req.params
    const user = await User.findByIdAndRemove(id)

    if(!user){
        throw new Error("Impossible to delete Now try Later")
    }
})

//Route to edit user
router.get("/admin/:id/edit", protect,admin, async(req,res) => {
    const { id } = req.params
    const user = await User.findById(id).select("-password")

    if(user){
        res.json(user)
    } else {
        throw new Error("User Not Found")
    }
})

//handling update user
router.put("/admin/:id/edit", protect,admin, async(req,res) => {
    const { id } = req.params
    const { name, email, isAdmin } = req.body
    const user = await User.findById(id)

    if(user){
        user.name = name || user.name
        user.email = email || user.email
        user.isAdmin = isAdmin || user.isAdmin

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error("User Not found")
    }
})

//Delete one Product => DELETE
router.delete("/admin/product/:id",protect,admin, async(req,res) => {
    const { id } = req.params
    const product = await Product.findById(id)

   if(product){
        await product.remove()
        res.json("item removed")    
   } else {
       throw new Error("Product Not Found")
   }
})

//Create Product => POST
router.post('/admin/product/new', protect, admin, async(req,res) => {
    const product = new Product({
        name: "Sample Product",
        image: "https://cdn.shopify.com/s/files/1/0279/8823/0213/products/TEEARSETBTRAPTTWSK1_grande.jpg?v=1623671092",
        description : "Sampde Desc",
        user: req.user._id,
        brand: "Sample Brand",
        price: 234,
        category: "Electronics",
        countInStock: 3,
        numReviews: 3
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

//Handling update Product => PUT
router.put('/admin/product/:id', protect, admin, async(req,res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    const { name,price,image,brand,category,description,countInStock } = req.body

    if(product) {
     product.name = name,
     product.image = image,
     product.description = description,
     product.brand = brand,
     product.price = price,
     product.category = category,
     product.countInStock = countInStock

       const updateProduct = await product.save()
       res.json(updateProduct)

    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

//get all orders
router.get("/admin/orders", protect,admin, async(req,res) => {
    const orders = await Orders.find({}).populate("user","id name")

    if(orders){
        res.json(orders)
    } else {
        res.status(404).json({
            message: "Not found"
        })
    }

})
module.exports = router
