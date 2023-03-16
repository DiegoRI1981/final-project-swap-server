const { Schema, model } = require('mongoose')

const chatSchema = new Schema({
    // product_id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Product'
    // },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
},
    {
        timestamps: true
    }
)

const Chat = model('Chat', chatSchema)

module.exports = Chat

