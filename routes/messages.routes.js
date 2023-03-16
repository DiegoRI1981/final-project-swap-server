const router = require("express").Router()

const Message = require('../models/Messages.model')

const { verifyToken } = require("../middlewares/verifyToken")


// router.get('/message', (req, res, next) => {

//     Message
//         .findById()
//         .then(response => res.json(response))
//         .catch(err => next(err))

// })

router.post('/', verifyToken, (req, res, next) => {

    const { message } = req.body
    const owner = req.payload_id

    Message
        .create({ owner, message })
        .then(response => res.json(response))
        .catch(err => next(err))
})


module.exports = router
