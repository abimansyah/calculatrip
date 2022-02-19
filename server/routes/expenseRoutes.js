const express = require('express')
const ExpenseController = require('../controllers/expenseControllers')
const expenseRouter = express.Router()
const authentication = require('../middlewares/Authentication')
const {expenseAuthorization} = require('../middlewares/Authorization')
const instanceMulter = require('../middlewares/multer')
const uploadToImagekit = require('../middlewares/uploadToImageKit')

expenseRouter.post('/:tripId', authentication, ExpenseController.postExpense)
expenseRouter.get('/trip/:tripId', authentication, ExpenseController.getExpenses)
expenseRouter.get('/:expenseId', authentication, ExpenseController.getExpenseById)
expenseRouter.delete('/:expenseId', authentication, expenseAuthorization, ExpenseController.deleteExpense)
expenseRouter.post('/:expenseId/image',instanceMulter.single("imageFile"), uploadToImagekit, authentication, ExpenseController.uploadImage)
expenseRouter.delete('/:expenseId/image/:imageId', authentication, ExpenseController.deleteImage)

module.exports = expenseRouter