//Add a slugify method
// Todo: Add a average cost
// Todo: Add location
const slugify = require('slugify')
const mongoose = require('mongoose')
const geocoder = require('../utils/geocoder')


const BootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, 'Name not longer than 50 characters']
    },
    slug: String,
    description: {
        type: String,
        required: true,
        maxlength: [500, 'Please just add 500 characters ']
    },
    website: {
        type: String
    },
    phone: {
        type: String,
        maxlength: [20, 'please provide an number no more than 20']
    },
    email: {
        type: String
    },
    address: {
        type: String,
        required: [true, 'Please provided an address']
    },
    location: {
        //GeoJSON Point
        type: {
            type: String,
            enum: ['Point']
        },
        coordinate: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    careers: {
        type: [String],
        enum:
            ['Web Development',
                'UI/UX',
                'Business',
                'Mobile Development',
                'Data Science', 'Other']
    },
    housing: {
        type: Boolean,
        default: false
    },
    jonAssistance: {
        type: Boolean,
        default: false
    },
    jobGuarantee: {
        type: Boolean,
        default: false
    },
    acceptGi: {
        type: Boolean,
        default: false
    }
})

// Creating a bootcamp slug from the name
BootcampSchema.pre('save', function (next) {
    this.slug = slugify(this.name, {lower: true})
    next()
})

BootcampSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address)
    this.location = {
        type: 'Point',
        coordinates: [loc[0].location, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode
    }
    this.address = undefined
    next()
})


module.exports = mongoose.model('Bootcamp', BootcampSchema)
