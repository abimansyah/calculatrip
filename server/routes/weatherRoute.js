const express = require('express')
const weatherRouter = express.Router()

// authentication
const authentication = require('../middlewares/Authentication')

// controller 
const weatherController = require('../controllers/weatherController')

weatherRouter.get('/coordinate', authentication, weatherController.getWeatherByCoordinate)
weatherRouter.get('/city', authentication, weatherController.getWeatherByCity)

module.exports = weatherRouter