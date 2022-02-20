const express = require('express')
const reportRouter = express.Router()


// authentication
const authentication = require('../middlewares/Authentication')

// controller 
const reportController = require('../controllers/reportController')

reportRouter.get('/:id', reportController.getReport)


module.exports = reportRouter