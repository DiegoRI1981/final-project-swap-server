const { Schema, model } = require('mongoose')

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'The title is require.'],
            unique: true
        },
        imageUrl: {
            type: String,
            required: [true, 'The image is require.'],
        },
        description: {
            type: String,
            required: [true, 'The description is require.'],
            minlength: [20, 'The description mut have min. 20 caracters.']
        },
        wishes: {
            type: String,
            required: [true, 'Los wishes son obligatorios.'],
            minlength: [3, 'The wishes must have min. 3 caracters.']
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

const Product = model('Product', productSchema)

module.exports = Product