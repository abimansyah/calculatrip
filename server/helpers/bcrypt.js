const brcrypt = require("bcryptjs")


const hasPassword = (plain_password) => {
    return brcrypt.hashSync(plain_password, 8)
}

const comparePassword = (plain_password, hash) => {
    return brcrypt.compareSync(plain_password, hash)
}


module.exports = {
    hasPassword,
    comparePassword
}