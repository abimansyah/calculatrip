const axios = require('axios');


class ExchangeRateController {
    static async getSymbols(req, res, next) {
        try {
            const result = await axios.get('https://api.exchangerate.host/symbols')
            let symbols = Object.values(result.data.symbols)
            res.status(200).json(symbols)
        } catch (err) {
            next(err)
        }
    }
    static async convertMoney(req, res, next) {
        try {
            const {
                from,
                to,
                amount
            } = req.body
            if (!from) throw {
                name: "From currency is required"
            }
            if (!to) throw {
                name: "To currency is required"
            }
            if (!amount) throw {
                name: "Amount currency is required"
            }
            const result = await axios.get(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);

            res.status(200).json({
                from: result.data.query.from,
                to: result.data.query.to,
                amount: result.data.query.amount,
                rate: result.data.info.rate,
                result: result.data.result
            })
        } catch (err) {
            next(err)
        }
    }

    static async getLatestRate(req, res, next) {
        try {
            const {
                base
            } = req.params;
            const result = await axios.get(`https://api.exchangerate.host/latest?base=${base}`);
            res.status(200).json({
                base: result.data.base,
                date: result.data.date,
                rates: result.data.rates
            })
        } catch (err) {
            next(err)
        }
    }
};

module.exports = ExchangeRateController