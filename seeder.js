// third parties
const fs = require('fs')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({path: './config/config.env'})

//Models
const Bootcamp = require('./models/Bootcamp')
const User = require('./models/User')


//Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

//Read JSON files
const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/data/bootcamp.json`, 'utf-8'))
const users = JSON.parse(
    fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8'))


//Importing data
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps)
        await User.create(bootcamps)
        console.log('Data imported... ')
        process.exit()
    } catch (error) {
        console.log(`You have this error importing: ${error}`)
    }
}

//Delete Data

const deleteData = async () => {
    try {
        await Bootcamp.deleteMany()
        await User.deleteMany()
        console.log(`Deleted successfully`)
        process.exit()
    } catch (error) {
        console.log(`You have this error deleting: ${error}`)
    }
}

if (process.argv[2] === '-i') {
    importData()
} else if (process.argv[2] === '-d') {
    deleteData()
}
