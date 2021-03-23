const express = require('express')
const dotenv = require('dotenv')

dotenv.config({path: './config/config.env'})

const app = express()

//Create a CRUD for the data you were given

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('connected')
})
