const axios = require('axios')




instanceAxiosOcr = axios.create({
    baseURL: 'https://api.ocr.space/parse/image',
    headers: {
        apikey: process.env.OCRAPIKEY
    }
})


module.exports = instanceAxiosOcr