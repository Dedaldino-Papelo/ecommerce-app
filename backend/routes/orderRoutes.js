const express = require("express")
const router = express()
var Order = require('../models/orderModel')
var { protect,admin } = require('../middleware/authMiddleware')



router.post("/api/orders", protect, async(req, res) => {
    const { orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice 
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error("No Order Items")
        return
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice

        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

//get order by Id
router.get("/api/order/:id", protect, async(req,res) => {
    const { id } = req.params
    const order = await Order.findById(id).populate('user','name email')
    if(!order){
        res.json("Order Not found").status(404)
    } else {
        res.json(order)
    }
})

//Update order to paid
router.put("/api/order/:id/pay", protect, async(req,res) => {
    const { id } = req.params
    const order = await Order.findById(id)
    if(order){
        order.isPaid = true
        order.paidAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error("Order not found")
    }
})

//update delivery to true
router.put("/api/order/deliery/:id", protect,admin, async(req,res) => {
    const { id } = req.params
    console.log(id)
    const order = await Order.findById(id)
    if(order){
        order.isDelivered = true,
        order.deliveryAt = Date.now()
        
        const updateOrder = order.save()
        res.json(updateOrder)
    } else {
        res.status().json({message: 'Order Not found'})
    }
})

//Get user order
router.get("/api/orders/myorders", protect, async(req,res) => {
    const orders = await Order.find({user: req.user._id})
    res.json(orders)
})

//Stripe Endpoint


module.exports = router