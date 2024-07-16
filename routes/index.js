const express = require('express')
const router = express.Router()

const admin = require('./modules/admin')

const restController = require('../controllers/restaurant-controller')
const userController = require('../controllers/user-controller')

const { generalErrorHandler } = require('../middleware/error-handler') // 新增這行


router.use('/admin', admin)

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp) 

router.get('/restaurants', restController.getRestaurants)

router.use('/', (req, res) => res.redirect('/restaurants'))
router.use('/', generalErrorHandler) // 新增這行

module.exports = router
