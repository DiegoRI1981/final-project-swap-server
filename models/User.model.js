const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new Schema(
  {
    profileImg: {
      type: String,
      default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3LFWyCHAvQT6Xdo4B0klvBCFHfJ-ofhNwOw&usqp=CAU',
      set: value => value === '' ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3LFWyCHAvQT6Xdo4B0klvBCFHfJ-ofhNwOw&usqp=CAU' : value
    },
    firstname: {
      type: String,
      required: [true, 'Firstname is required']
    },
    lastname: {
      type: String,
      required: [true, 'lasstname is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: [3, 'Password must have min 3 caracters.']
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    },
    products: {
      type: Schema.Types.ObjectId,
      ref: 'Products'
    }
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword

  next()
})

userSchema.methods.signToken = function () {

  const { _id, email, firstname, lastname, role, products, profileImg } = this
  const payload = { _id, email, firstname, lastname, role, products, profileImg }

  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: "6h" }
  )

  return authToken
}

userSchema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}

const User = model("User", userSchema);

module.exports = User;