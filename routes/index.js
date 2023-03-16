const router = require('express').Router()

const authRoutes = require('./auth.routes')
router.use('/auth', authRoutes)

const userRoutes = require('./user.routes')
router.use('/user', userRoutes)

const adminRoutes = require('./admin.routes')
router.use('/admin', adminRoutes)

const productRoutes = require('./products.routes')
router.use('/products', productRoutes)

const uploadRoutes = require('./upload.routes')
router.use('/upload', uploadRoutes)

const chatRoutes = require('./chat.routes')
router.use('/chat', chatRoutes)

const messagesRoutes = require('./messages.routes')
router.use('/messages', messagesRoutes)



module.exports = router