const express = require('express')
const tripRouter = express.Router()

// controller
const TripController = require("../controllers/tripControllers")

// midleware 
const authentication = require("../middlewares/Authentication")

tripRouter.get('/', authentication, TripController.getTrips)
tripRouter.post('/', authentication, TripController.postTrip)
tripRouter.get('/:id', authentication, TripController.getTripById)
tripRouter.delete('/:id', authentication, TripController.deleteTrip)
tripRouter.put('/:id', authentication, TripController.editTrip)

module.exports = tripRouter