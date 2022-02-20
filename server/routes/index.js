const express = require('express')
const router = express.Router()
const userRouter = require('./userRoutes')
const tripRouter = require('./tripRoutes')
const expenseRouter = require('./expenseRoutes')
const savingRouter = require('./savingRoutes')
const exchangeRateRouter = require('./exchangerateRoute')
const weatherRouter = require('./weatherRoute')
const ocrRouter = require('./ocrRoute')
const reportRouter = require('./reportRoute')

router.use('/users', userRouter)
router.use('/trips', tripRouter)
router.use('/expenses', expenseRouter)
router.use('/savings', savingRouter)
router.use('/exchangerate', exchangeRateRouter)
router.use('/weather', weatherRouter)
router.use('/ocr', ocrRouter)
router.use('/report', reportRouter)

module.exports = router