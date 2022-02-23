const express = require('express')
const ocrRouter = express.Router()
const instanceMulter = require('../middlewares/multer')

// authentication
const authentication = require('../middlewares/Authentication')

// controller 
const ocrController = require('../controllers/ocrController')
const uploadToImagekit = require('../middlewares/uploadToImagekit')

ocrRouter.post('/',authentication,instanceMulter.single("imageFile"),uploadToImagekit, ocrController.postOcr)


module.exports = ocrRouter