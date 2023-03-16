const { Schema, model } = require('mongoose')

const messageSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String
    },
},
    {
        timestamps: true
    }
)

const Message = model('Message', messageSchema)

module.exports = Message

