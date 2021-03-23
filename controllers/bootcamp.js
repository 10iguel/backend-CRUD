const asyncHandler = require('../middleware/async')
const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')

// Get all bootcamps

exports.getBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamp.find()
    await res.status(200).json({
        result: bootcamps,
        count: bootcamps.length,
        success: true
    })
})

//Get one bootcamp

exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with the id of ${req.params.id}`, 404))
    }
    await res.status(200).json({
        result: bootcamp,
        success: true
    })
})

//Create Bootcamp

exports.createBootcamp = asyncHandler(async (req, res, next) => {
    const {} = req.body
})
