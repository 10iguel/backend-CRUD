const express = require('express')
const {body} = require('express-validator/check')
const bootcampController = require('../controllers/bootcamp')


const router = express.Router()


router.get('/', bootcampController.getBootcamps)


router.get('/:id', bootcampController.getBootcamp)


module.exports = router
