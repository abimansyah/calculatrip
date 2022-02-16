const errorHandler = (err, req, res, next) => {
    let status = 500
    let message = 'Internal Server Error'

    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        status = 400
        message = err.errors[0].message
    } else if (err.name === "Invalid Username/Password") {
        status = 401
        message = "Invalid email/username/password"
    } else if (err.name === "JsonWebTokenError") {
        status = 401
        message = "Invalid Token"
    } else if (err.name === "Forbiden to Access") {
        status = 401
        message = "Forbiden to Access"
    } else if (err.name === "User not found") {
        status = 404
        message = "User not found"
    }



    res.status(status).json({
        message
    })
}

module.exports = errorHandler