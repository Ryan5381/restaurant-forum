const bcrypt = require('bcryptjs') // 加入這行
const db = require('../models')
const { User } = db

// 製作一個userController物件
const userController = {
  signUpPage: (req, res) =>{
    res.render('signup')
  },
  //加入下面這段
  signUp: (req, res) =>{
    // hash會回傳promise，所以後面可使用.then做非同步處理
    bcrypt.hash(req.body.password, 10)
    .then(hash => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash
    }))
    .then(() =>{
      res.redirect('/signin')
    })
  }
}

module.exports = userController
