const express = require('express')
const tripRouter = express.Router()

// controller
const TripController = require("../controllers/tripControllers")

// midleware 
const authentication = require("../middlewares/Authentication")

const {
    tripAuthorization
} = require("../middlewares/Authorization")
const instanceMulter = require('../middlewares/multer')
const uploadToImagekit = require('../middlewares/uploadToImagekit')


tripRouter.get('/', authentication, TripController.getTrips)
tripRouter.post('/', instanceMulter.single("imageFile"), uploadToImagekit, authentication, TripController.postTrip)
tripRouter.get('/:id', authentication, TripController.getTripById)
tripRouter.delete('/:id', authentication, tripAuthorization, TripController.deleteTrip)
tripRouter.put('/:id', instanceMulter.single("imageFile"), uploadToImagekit, authentication, tripAuthorization, TripController.editTrip)

tripRouter.post('/:id', authentication, tripAuthorization, TripController.addCompanion)
tripRouter.patch('/:userTripId', authentication, TripController.acceptInvitation)
// delete companion routes
tripRouter.delete('/:tripId/:userId', authentication, TripController.deleteCompanion)

module.exports = tripRouter