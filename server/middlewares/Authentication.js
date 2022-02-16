const {
    verifyJwt
} = require('../helpers/jwt')

const {
    User
} = require("../models/index")


const authentication = async (req, res, next) => {
    const {
        access_token
    } = req.headers
    try {
        if (!access_token) throw {
            name: "Forbiden to Access"
        }
        const verify = verifyJwt(access_token)
        if (!verify) throw {
            name: 'JsonWebTokenError'
        }
        const user = await User.findByPk(verify.id)
        if (!user) {
            throw {
                name: 'Forbiden to Access'
            }
        }
        req.user = {
            id: user.id,
            username: user.username,
            email: user.email
        }
        next()
    } catch (err) {
        next(err)
    }

}


module.exports = authentication