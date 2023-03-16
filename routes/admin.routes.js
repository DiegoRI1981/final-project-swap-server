const router = require('express').Router()
const User = require('./../models/User.model')
const Product = require('./../models/Product.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { verifyToken } = require("../middlewares/verifyToken")
const mongoose = require('mongoose')

router.get('/allProfiles', verifyToken, (req, res, next) => {
    User
        .find()
        .populate('products')
        .then(users => res.json(users))
        .catch(err => next(err))
})

router.get('/userProfile/:user_id', verifyToken, (req, res, next) => {
    const { user_id } = req.params
    User
        .findById(user_id)
        .populate('products')
        .then(user => res.json(user))
        .catch(err => next(err))
})


module.exports = router

