const express = require('express')
const ExpenseController = require('../controllers/expenseControllers')
const expenseRouter = express.Router()
const authentication = require('../middlewares/Authentication')
const {expenseAuthorization} = require('../middlewares/Authorization')

expenseRouter.post('/:tripId', authentication, ExpenseController.postExpense)
expenseRouter.get('/trip/:tripId', authentication, ExpenseController.getExpenses)
expenseRouter.get('/:expenseId', authentication, ExpenseController.getExpenseById)
expenseRouter.delete('/:expenseId', authentication, expenseAuthorization, ExpenseController.deleteExpense)

module.exports = expenseRouter