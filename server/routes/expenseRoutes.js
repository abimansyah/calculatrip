const express = require('express')
const expenseRouter = express.Router()

router.get('/', (req, res) => {
  res.send('Expense!')
})

module.exports = expenseRouter