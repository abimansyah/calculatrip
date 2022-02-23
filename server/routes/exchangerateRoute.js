const express = require('express')
const exchangeRateRouter = express.Router()

// authentication
const authentication = require('../middlewares/Authentication')

// controller 
const ExchangeRateController = require('../controllers/exchangeRateController')

exchangeRateRouter.get('/', ExchangeRateController.getSymbols)
exchangeRateRouter.get('/:base', ExchangeRateController.getLatestRate)
exchangeRateRouter.post('/', ExchangeRateController.convertMoney)

module.exports = exchangeRateRouter