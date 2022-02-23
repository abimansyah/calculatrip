const express = require('express')
const weatherRouter = express.Router()

// authentication
const authentication = require('../middlewares/Authentication')

// controller 
const weatherController = require('../controllers/weatherController')

weatherRouter.post('/coordinate', weatherController.getWeatherByCoordinate)
weatherRouter.post('/city', weatherController.getWeatherByCity)

module.exports = weatherRouter