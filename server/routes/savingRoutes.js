const express = require('express')
const SavingController = require('../controllers/savingControllers')
const authentication = require('../middlewares/Authentication')
const savingRouter = express.Router()

savingRouter.post('/:tripId', authentication ,SavingController.postSaving)
savingRouter.get('/trip/:tripId', authentication ,SavingController.getSavings)
savingRouter.get('/:savingId', authentication ,SavingController.getSavingById)
savingRouter.delete('/:savingId', authentication ,SavingController.deleteSaving)


module.exports = savingRouter