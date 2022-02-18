const express = require('express')
const ExpenseController = require('../controllers/expenseControllers')
const expenseRouter = express.Router()

expenseRouter.post('/:tripId', ExpenseController.postExpense)
expenseRouter.get('/trip/:tripId', ExpenseController.getExpenses)
expenseRouter.get('/:expenseId', ExpenseController.getExpenseById)
expenseRouter.delete('/:expenseId', ExpenseController.deleteExpense)

module.exports = expenseRouter