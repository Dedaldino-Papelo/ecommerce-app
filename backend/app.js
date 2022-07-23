var express = require("express")
var app = express()
var cors = require('cors')
var mongoose = require('mongoose');
var Products = require('./routes/products');
var User = require('./routes/user')
var Order = require('./routes/orderRoutes')
require('dotenv').config()
const seedDB = require("./seed");
const Admin = require("./routes/Admin")
const Upload = require("./routes/uploadRoutes");
const path = require('path')
const { notFound, errorhandler } = require('./middleware/errorMiddleware')
const stripe = require("stripe")(process.env.STRIPE_API_KEY)

//seedDB()
//middlewares
app.use(cors())
//add body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//connect to mongoose
const LOCAL_URL = process.env.DATABASE_URL

mongoose.connect(process.env.MONGO_URI);

//static files
app.use(express.static(path.join(__dirname, 'uploads')))


//paypal api
app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))
app.get("/api/config/stripe", (req, res) => res.send(process.env.STRIPE_PUBLISHABLE_KEY))

app.post("/payment", async(req, res) => {
    let status, error;
    const { token, amount } = req.body
    try {
        await stripe.charges.create({
          source: token.id,
          amount,
          currency: 'usd',
        });
        status = 'success';
      } catch (error) {
        console.log(error);
        status = 'Failure';
      }
      res.json({ error, status });
})

//Routes
app.use(Products)
app.use(User)
app.use(Order)
app.use(Admin)
app.use(Upload)
//middleware
app.use(notFound)
app.use(errorhandler)

var Port = process.env.PORT || 4000
app.listen(Port, () => {
    console.log(`App Listening on port ${Port}`)
})