//Add a slugify method
// Todo: Add a avarage cost
// Todo: Add location
const slugify = require('slugify')
const mongoose = require('mongoose')
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


module.exports = mongoose.model('Bootcamp', BootcampSchema)
