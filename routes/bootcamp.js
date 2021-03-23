const express = require('express')
const {body} = require('express-validator/check')
const bootcampController = require('../controllers/bootcamp')


const router = express.Router()

//get bootcamps
router.get('/', bootcampController.getBootcamps)

// get single bootcamp
router.get('/:id', bootcampController.getBootcamp)

router.post('/', bootcampController.createBootcamp)

module.exports = router
