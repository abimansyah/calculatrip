const express = require('express')
const userRouter = express.Router()

router.get('/', (req, res) => {
  res.send('User!')
})

module.exports = userRouter