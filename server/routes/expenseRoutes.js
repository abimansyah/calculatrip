const express = require('express')
const expenseRouter = express.Router()

expenseRouter.get('/', (req, res) => {
  res.send('Expense!')
})

module.exports = expenseRouter