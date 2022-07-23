const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()
var Product = require('../models/productModel')

//Routes
//index

//Fetch All products
router.get("/api/products",  async(req, res) => {
    const pageSize = 4
    const page = Number(req.query.page) || 1
    const count = await Product.countDocuments({})
    const product = await Product.find({}).limit(pageSize).skip(pageSize * (page - 1))
    const pageCount = Math.ceil(count / pageSize)
    res.json({
        product,
        pageCount
    }) 
})

//Fetch Single products
router.get("/api/products/:id", (req, res) => {
    const { id } = req.params
    Product.findById(id, (err, foundProduct) => {
        if (err) {
            res.status(404).json({ message: 'product not found' })
        } else {
            res.json(foundProduct)
        }
    })
})


//Product reviews
router.post("/api/products/:id/reviews", protect, async(req, res) => {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)

    if(product){
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

        if(alreadyReviewed){
            res.status(400)
            res.json({message: "Product already reviewd"})

        }

        const reviewd = {
            name: req.user.name,
            rating: Number(rating),
            comment:comment,
            user: req.user._id
        }

        product.reviews.push(reviewd)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc,0) /product.reviews.length
        await product.save()
        res.status(201).json({message: "added Review"})
    } else {
        throw new Error("Product Not Found")
    }
})

//Top products for carrosel
router.get("/products/top", async(req,res) => {
    const product = await Product.find({}).sort({rating: -1}).limit(3)
    res.json(product)
})

module.exports = router