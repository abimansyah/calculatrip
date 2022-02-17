const express = require('express')
const savingRouter = express.Router()

savingRouter.get('/', (req, res) => {
  res.send('Saving!')
})

module.exports = savingRouter