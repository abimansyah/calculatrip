const jwt = require("jsonwebtoken")
const key = process.env.SECRETKEY


const createToken = (payload) => {
    return jwt.sign(payload, key)
}

const verifyJwt = (token) => {
    return jwt.verify(token, key)
}

module.exports = {
    createToken,
    verifyJwt
}