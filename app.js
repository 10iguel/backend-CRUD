const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const connectDB = require('./config/db')

dotenv.config({path: './config/config.env'})

connectDB()

const bootcamps = require('./routes/bootcamp')


const app = express()


app.use('/api/v1/bootcamps', bootcamps)
//Create a CRUD for the data you were given

const PORT = process.env.PORT || 4550


const server = app.listen(PORT, console.log(`Server running ${__dirname}`))

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error:${err.message}`)
    server.close(() => process.exit(1))
})
