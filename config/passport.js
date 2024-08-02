// 載入各種套件
// 引入User model
const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const { User, Restaurant } = require('../models')
// set up Passport strategy
passport.use(new LocalStrategy(
  // customize user field
  {
    usernameField: 'email', // 指定username欄位為'email'
    passwordField: 'password', // 指定password欄位為'password'
    passReqToCallback: true 
  },
  // authenticate user
  (req, email, password, done) => {
    User.findOne({ where: { email } }) 
      .then(user => {
        if (!user) return done(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
        bcrypt.compare(password, user.password).then(res => {
          if (!res) return done(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
          return done(null, user)
        })
      })
  }
))
// serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  User.findByPk(id, {
    include:[
      { model: Restaurant, as: 'FavoritedRestaurants'},
      { model: Restaurant, as: 'LikedRestaurants'}
    ]
  })
  .then(user => {
    console.log(user)
    done(null, user.toJSON())
  })
  .catch(err => done(err))
  })

module.exports = passport