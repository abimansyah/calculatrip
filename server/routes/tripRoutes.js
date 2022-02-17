const express = require('express')
const tripRouter = express.Router()

// controller
const TripController = require("../controllers/tripControllers")

// midleware 
const authentication = require("../middlewares/Authentication")

tripRouter.get('/', authentication, TripController.getTrips)
tripRouter.post('/', authentication, TripController.postTrip)

module.exports = tripRouter