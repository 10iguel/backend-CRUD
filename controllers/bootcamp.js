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
    //req.body.user = req.user
    //console.log(req.body.user)
    //const publishedBootcamp = await Bootcamp.findOne({user: req.user.id})
    //if (publishedBootcamp && req.user.role !== 'admin') {
    //return next(new ErrorResponse(`The user with ID of ${req.user.id} has already published a bootcamp`, 400))
    //}
    console.log(req.body)
    const bootcamp = await Bootcamp.create(req.body)

    await res.status(201).json({
        result: true,
        data: bootcamp
    })
})

//Update Bootcamp

exports.getBootcamp = asyncHandler(async (req, res, next) => {
    let bootcamp = await Bootcamp.findById(req.params.id)
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with the id of ${req.params.id}`, 404))
    }

    bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    await res.status(200).json({
        result: bootcamp,
        success: true
    })
})
