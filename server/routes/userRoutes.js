const express = require('express')
const userRouter = express.Router()

// controller
const UserController = require("../controllers/userControllers")

// midleware 
const authentication = require("../middlewares/Authentication")
const {
    userAuthorization
} = require("../middlewares/Authorization")

userRouter.post('/login', UserController.loginUser)
userRouter.post('/register', UserController.registerUser)
userRouter.get('/', authentication, UserController.getUsers)
userRouter.get('/profile', authentication, UserController.getUserProfile)
userRouter.get('/profile/:input', authentication, UserController.getUserByInput)
userRouter.put('/:id', authentication, userAuthorization, UserController.editUser)
userRouter.get('/invitation', authentication, UserController.getInvitation)

module.exports = userRouter