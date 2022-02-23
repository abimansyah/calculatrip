const axios = require('axios')


const PRIVATEKEYIMAGEKIT = process.env.PRIVATEKEYIMAGEKIT

instanceAxios = axios.create({
    baseURL: 'https://upload.imagekit.io/api/v1/',
    auth: {
        username: PRIVATEKEYIMAGEKIT
    }
})


module.exports = instanceAxios