const router = require("express").Router();

const Product = require('../models/Product.model')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { verifyToken } = require("../middlewares/verifyToken")

router.get("/getAllProducts", (req, res, next) => {


  Product
    .find()
    .sort({ title: 1 })
    .then(response => setTimeout(() => res.json(response), 1000))
    .catch(err => next(err))
})

router.get("/getOneProduct/:product_id", (req, res, next) => {
  const { product_id } = req.params


  Product
    .findById(product_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.get('/getProductByOwner', verifyToken, (req, res, next) => {

  const owner = req.payload._id

  Product
    .find({ owner })
    .sort({ title: 1 })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.post("/saveProduct", verifyToken, (req, res, next) => {

  const { title, imageUrl, description, wishes } = req.body
  const { _id: owner } = req.payload

  Product
    .create({ title, imageUrl, description, wishes, owner })
    .then(response => res.json(response))
    .catch(err => next(err))

})

router.put("/editProduct/:product_id", verifyToken, (req, res, next) => {

  const { product_id } = req.params
  const { title, imageUrl, description, wishes } = req.body

  Product
    .findByIdAndUpdate(product_id, { title, imageUrl, description, wishes })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.delete("/deleteProduct/:product_id", verifyToken, (req, res, next) => {
  const { product_id } = req.params

  Product
    .findByIdAndDelete(product_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})

module.exports = router;
