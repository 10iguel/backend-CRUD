const express = require('express')
const {body} = require('express-validator/check')
const authController = require('../controllers/auth')


const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

module.exports = router
