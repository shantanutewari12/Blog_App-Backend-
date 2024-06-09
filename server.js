const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// ENV CONFIG
dotenv.config()

// IMPORTING ROUTES 
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')

// MONGODB CONNECTION
connectDB()

// REST OBJECTS
const app = express()

// MIDDLEWARES
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// USING OUR ROUTES
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/blog", blogRoutes)

//PORT
const PORT = process.env.PORT || 8080;

//LISTEN
app.listen(8080, () => {
    console.log(`Server is Running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgCyan.white)
})