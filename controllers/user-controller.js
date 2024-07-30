const bcrypt = require('bcryptjs')
const db = require('../models')
const { localFileHandler } = require('../helpers/file-helpers') // 將 file-helper 載進來
const { User, Comment, Restaurant} = db

const userController = {
  signUpPage: (req, res) =>{
    res.render('signup')
  },
  
  signUp: (req, res, next) => { 
    if (req.body.password !== req.body.passwordCheck) throw new Error('Passwords do not match!')

    User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user) throw new Error('Email already exists!')
        return bcrypt.hash(req.body.password, 10) 
      })
      .then(hash => User.create({ 
      name: req.body.name,
      email: req.body.email,
      password: hash
    }))
    .then(() =>{
      req.flash('success_messages', '成功註冊帳號！') 
      res.redirect('/signin')
    })
    .catch(err => next(err)) 
  },

  signInPage: (req, res) => {
    res.render('signin')
  },

  signIn: (req, res) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/restaurants')
  },
  
  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/signin')
  },

  getUser: (req, res, next) => {
    if (!req.user) throw new Error('User not logged in')
    const currentUserId = req.user.id
    return User.findByPk(req.params.id, { 
      include: 
      [{
        model: Comment,
        include:[Restaurant]
      }]
      
  })
    .then(user => {
      if (!user) throw new Error("User did'n exist")
      res.render('users/profile', {
        user: user.toJSON(),
        isCurrentUser: user.id === currentUserId
    })
    })
    .catch(err => next(err))
  },
  editUser: (req, res, next) => {
    return User.findByPk(req.params.id, {
      raw: true,
      nest: true
    })
    .then(user => {
      if (!user) throw new Error("User did'n exist")
      res.render('users/edit', {user})
    })
    .catch(err => next(err))
  },
  putUser: (req, res, next) => {
    const name  = req.body.name
    if (!name) throw new Error('User name is required!')
    const { file } = req

    Promise.all([
      User.findByPk(req.params.id),
      localFileHandler(file) // 把檔案傳到 file-helper 處理
    ])
    
    .then(([user, filePath]) =>{
      if (!user) throw new Error("User did'n exist")
      return user.update({ 
        name,
        image: filePath || user.image 
      })
    })
    .then(() => {
      req.flash('success_messages', '使用者資料編輯成功')
      res.redirect(`/users/${req.params.id}`)
    })
    .catch(err => next(err))
  }
}

module.exports = userController
