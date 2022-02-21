const express = require('express')
const ocrRouter = express.Router()
const instanceMulter = require('../middlewares/multer')

// authentication
const authentication = require('../middlewares/Authentication')

// controller 
const ocrController = require('../controllers/ocrController')

ocrRouter.post('/',instanceMulter.single("imageFile"), ocrController.postOcr)


module.exports = ocrRouter