const express = require('express')
const tripRouter = express.Router()

tripRouter.get('/', (req, res) => {
  res.send('Trip!')
})

module.exports = tripRouter