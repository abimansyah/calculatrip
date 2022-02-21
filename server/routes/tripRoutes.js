const express = require('express')
const tripRouter = express.Router()

// controller
const TripController = require("../controllers/tripControllers")

// midleware 
const authentication = require("../middlewares/Authentication")
const {tripAuthorization} = require("../middlewares/Authorization")
const instanceMulter = require('../middlewares/multer')
const uploadToImagekit = require('../middlewares/uploadToImagekit')

tripRouter.get('/', authentication, TripController.getTrips)
tripRouter.post('/', instanceMulter.single("imageFile"), uploadToImagekit, authentication, TripController.postTrip)
tripRouter.get('/:id', authentication, TripController.getTripById)
tripRouter.delete('/:id', authentication, tripAuthorization, TripController.deleteTrip)
tripRouter.put('/:id', authentication, tripAuthorization, TripController.editTrip)

module.exports = tripRouter