const express = require('express')
const SavingController = require('../controllers/savingControllers')
const authentication = require('../middlewares/Authentication')
const { savingAuthorization } = require('../middlewares/Authorization')
const savingRouter = express.Router()

savingRouter.post('/:tripId', authentication ,SavingController.postSaving)
savingRouter.get('/trip/:tripId', authentication, savingAuthorization,SavingController.getSavings)
savingRouter.get('/:savingId', authentication ,SavingController.getSavingById)
savingRouter.delete('/:savingId', authentication, savingAuthorization, SavingController.deleteSaving)


module.exports = savingRouter