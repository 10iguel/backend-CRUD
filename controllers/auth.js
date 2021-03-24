const asyncHandler = require('../middleware/async')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')

// register
exports.register = asyncHandler(async (req, res, next) => {
    const {name, email, password, role} = req.body

    const user = new User.create({
        name,
        email,
        password,
        role
    })
    sendResponseToken(user, 200, res)
})


//Login
exports.login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body

    if (!email || !password) {
        return next(new ErrorResponse('Please provide', 400))
    }

    //Check for a user
    const user = await User.findOne({email}).select('+password')
    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401))
    }

    //Check if password matches
    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
        return next(new ErrorResponse('Invalid Credentials', 401))
    }

    sendResponseToken(user, 200, res)
})

//Logout

exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })

    await res.status(200).json({
        success: true,
        data: {}
    })
})

//Get me
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    await res.status(200).json({
        success: true,
        data: user
    })
})

//Update User

exports.updateDetails = asyncHandler(async (req, res, next) => {
    const fieldToUpdate = {
        name: req.body.name,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, fieldToUpdate, {
        new: true,
        runValidators: true
    })
    await res.status(200).json({
        result: user,
        success: true
    })
})

exports.updatePassword = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')

    //Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
        next(new ErrorResponse('Password is incorrect', 401))
    }
    user.password = req.body.newPassword
    await user.save()

    sendResponseToken(user, 200, res)
})


const sendResponseToken = (user, statusCode, res) => {
    const token = user.getSingedJwtToken()

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    if (process.env.NODE_ENV === 'production') {
        options.secure = true
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({success: true, token})
}
