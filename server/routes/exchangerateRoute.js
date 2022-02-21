const express = require('express')
const exchangeRateRouter = express.Router()

// authentication
const authentication = require('../middlewares/Authentication')

// controller 
const ExchangeRateController = require('../controllers/exchangeRateController')

exchangeRateRouter.get('/', authentication, ExchangeRateController.getSymbols)
exchangeRateRouter.get('/:base', authentication, ExchangeRateController.getLatestRate)
exchangeRateRouter.post('/', authentication, ExchangeRateController.convertMoney)

module.exports = exchangeRateRouter