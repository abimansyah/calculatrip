const express = require('express')
const tripRouter = express.Router()

router.get('/', (req, res) => {
  res.send('Trip!')
})

module.exports = tripRouter