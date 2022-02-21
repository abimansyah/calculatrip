const express = require('express')
const reportRouter = express.Router()
const {reportAuthorization} = require('../middlewares/Authorization')


// authentication
const authentication = require('../middlewares/Authentication')

// controller 
const reportController = require('../controllers/reportController')

reportRouter.get('/:tripId',authentication,reportAuthorization, reportController.getReport)


module.exports = reportRouter