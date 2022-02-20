const axios = require('axios')




instanceAxiosOcr = axios.create({
    baseURL: 'https://api.ocr.space/parse/image',
    headers: {
        apikey: "K89321088288957"
    }
})


module.exports = instanceAxiosOcr