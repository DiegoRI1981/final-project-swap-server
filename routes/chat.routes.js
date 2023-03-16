const router = require("express").Router();

const { verifyToken } = require("../middlewares/verifyToken")

const Chat = require('./../models/Chat.model')
const Message = require('../models/Messages.model')


router.get('/:participant_id', verifyToken, (req, res, next) => {
    const { participant_id } = req.params
    const user_id = req.payload._id

    Chat
        .find({ participants: { $all: [participant_id, user_id] } })
        .populate({
            path: 'messages',
            populate: {
                path: 'owner',
                model: 'User'
            }
        })
        .populate({
            path: 'participants',
            model: 'User'
        })
        .then((chat) => {
            if (chat.length > 0) {
                return res.json(chat)
            } else {
                return res.json([])
            }
        })
        .catch(err => next(err))
})

router.post('/:participant_id', verifyToken, (req, res, next) => {

    const { participant_id } = req.params
    const user_id = req.payload._id
    const { message } = req.body

    Chat
        .find({ participants: { $all: [participant_id, user_id] } })
        .then(([chat]) => {
            console.log(chat)
            if (chat) {
                Message
                    .create({ owner: user_id, message })
                    .then(message => {
                        Chat
                            .findByIdAndUpdate(chat._id, { $addToSet: { messages: message._id } })
                            .then(chat => res.json(chat))
                            .catch(err => next(err))
                    })
                    .catch(err => next(err))
            } else {
                const participants = [user_id, participant_id]
                Message
                    .create({ owner: user_id, message })
                    .then(message => {
                        Chat
                            .create({ participants, messages: [message._id] })
                            .then(chat => res.json(chat))
                            .catch(err => next(err))
                    })
                    .catch(err => next(err))

            }
        })

})

router.delete("/deleteChat/:chat_id", verifyToken, (req, res, next) => {
    const { chat_id } = req.params


    Chat
        .findByIdAndDelete(chat_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})


module.exports = router;
