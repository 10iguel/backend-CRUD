const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require('morgan')
const connectDB = require('./config/db')

dotenv.config({path: './config/config.env'})

connectDB()

const bootcamps = require('./routes/bootcamp')
const courses = require('./routes/courses')
const auth = require('./routes/auth')
const users = require('./routes/user')
const reviews = require('./routes/reviews')


const app = express()

app.use(express.json())


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/auht', auth)
app.use('/api/v1/bootcamps', users)
//Create a CRUD for the data you were given

const PORT = process.env.PORT || 4550


const server = app.listen(PORT, console.log(`Server running ${__dirname}`))

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error:${err.message}`)
    server.close(() => process.exit(1))
})
