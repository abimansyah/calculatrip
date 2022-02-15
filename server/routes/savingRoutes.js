const express = require('express')
const savingRouter = express.Router()

router.get('/', (req, res) => {
  res.send('Saving!')
})

module.exports = savingRouter