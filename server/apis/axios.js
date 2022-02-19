const axios = require('axios')


const PRIVATEKEYIMAGEKIT = "private_OkNSf90vWQvyXxxz75BgzFrvaqU="

instanceAxios = axios.create({
    baseURL: 'https://upload.imagekit.io/api/v1/',
    auth: {
        username: PRIVATEKEYIMAGEKIT
    }
})


module.exports = instanceAxios