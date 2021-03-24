const express = require('express')
const {body} = require('express-validator/check')
const bootcampController = require('../controllers/bootcamps')


const router = express.Router()

//get bootcamps
router.get('/', bootcampController.getBootcamps)

// get single bootcamp
router.get('/:id', bootcampController.getBootcamp)

//creating bootcamp
router.post('/', bootcampController.createBootcamp)

//updating bootcamp
router.put('/:id', bootcampController.updateBootcamp)

//deleting bootcamp
router.delete('/:id', bootcampController.deleteBootcamp)


module.exports = router
