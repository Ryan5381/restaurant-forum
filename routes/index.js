const express = require('express')
const router = express.Router()

const admin = require('./modules/admin')

const restController = require('../controllers/restaurant-controller')
const userController = require('../controllers/user-controller') // 加入這行


router.use('/admin', admin)

router.get('/signup', userController.signUpPage) //加入這行
router.post('/signup', userController.signUp) //注意用 post，加入這行

router.get('/restaurants', restController.getRestaurants)

router.use('/', (req, res) => res.redirect('/restaurants'))

module.exports = router

