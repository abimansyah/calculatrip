const express = require('express')
const ocrRouter = express.Router()
const instanceMulter = require('../middlewares/multer')
const uploadToImagekit = require('../middlewares/uploadToImagekit')
// authentication
const authentication = require('../middlewares/Authentication')

// controller 
const ocrController = require('../controllers/ocrController')


ocrRouter.post('/', authentication, instanceMulter.single("imageFile"), uploadToImagekit, ocrController.postOcr)


module.exports = ocrRouter