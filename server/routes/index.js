const express = require('express')
const router = express.Router()
const userRouter = require('./userRoutes')
const tripRouter = require('./tripRoutes')
const expenseRouter = require('./expenseRoutes')
const savingRouter = require('./savingRoutes')

router.use('/users', userRouter)
router.use('/trips', tripRouter)
router.use('/expenses', expenseRouter)
router.use('/savings', savingRouter)

module.exports = router