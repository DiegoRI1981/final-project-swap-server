const router = require('express').Router()
const User = require('./../models/User.model')
const Product = require('./../models/Product.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { verifyToken } = require("../middlewares/verifyToken")

router.get('/profile', verifyToken, (req, res, next) => {

    const user_id = req.payload._id

    User
        .findById(user_id)
        .then(response => res.json(response))
        .catch(err => next(err))

})

router.put('/edit/:user_id', verifyToken, (req, res, next) => {
    const user_id = req.payload._id
    // const user_id = req.params
    const { profileImg, firstname, lastname, email } = req.body

    User
        .findByIdAndUpdate(user_id, { profileImg, firstname, lastname, email })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.delete('/delete', verifyToken, (req, res, next) => {
    const user_id = req.payload._id

    User
        .findByIdAndDelete(user_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

module.exports = router