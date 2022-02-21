const errorHandler = (err, req, res, next) => {
    let status = 500
    let message = 'Internal Server Error'

    // console.log(err);

    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        status = 400
        message = err.errors[0].message
    } else if (err.name === "Invalid Username/Password") {
        status = 401
        message = "Invalid email/username/password"
    } else if (err.name === "JsonWebTokenError") {
        status = 401
        message = "Invalid Token"
    } else if (err.name === "Email or Username is required") {
        status = 400
        message = "Email or Username is required"
    } else if (err.name === "Password is required") {
        status = 400
        message = "Password is required"
    } else if (err.name === "Forbiden to Access") {
        status = 401
        message = "Forbiden to Access"
    } else if (err.name === "User not found") {
        status = 404
        message = "User not found"
    } else if (err.name === "From currency is required") {
        status = 400
        message = "From currency is required"
    } else if (err.name === "To currency is required") {
        status = 400
        message = "To currency is required"
    } else if (err.name === "Amount currency is required") {
        status = 400
        message = "Amount currency is required"
    } else if (err.name === "TripNotFound") {
        status = 404
        message = "Trip not found"
    } else if (err.name === "UserTripNotFound") {
        status = 404
        message = "User Trip not found"
    } else if (err.name === "ExpenseNotFound") {
        status = 404
        message = "Expense not found"
    } else if (err.name === "SavingNotFound") {
        status = 404
        message = "Saving not found"
    } else if (err.name === 'Unauthorize') {
        status = 403
        message = 'Unauthorize - Forbiden to Access'
    } else if (err.name === 'InvalidImageFormat') {
        status = 400
        message = 'Invalid Image Format'
    } else if (err.name === 'InvalidImageSize') {
        status = 400
        message = "Image size can't exceed 5MB"
    } else if (err.name === 'Error Create Data') {
        status = 400
        message = "Error Create Data"
    } else if (err.name === "Can't read file image file") {
        status = 400
        message = "Can't read file image file"
    } else if (err.name === "ImageNotFound") {
        status = 404
        message = "Image not found"     
    } else if (err.name === "Latitude is required") {
        status = 400
        message = "Latitude is required"
    } else if (err.name === "Longitude is required") {
        status = 400
        message = "Longitude is required"
    } else if (err.name === "city is required") {
        status = 400
        message = "City is required"
    } 
    else if (err.response && err.response.data.message === "wrong latitude") {
        status = 400
        message = "Wrong Latitude"
    } else if (err.response && err.response.data.message === "wrong longitude") {
        status = 400
        message = "Wrong Longitude"
    } else if (err.response && err.response.data.message === 'city not found') {
        status = 404
        message = 'City not found'
    }
    res.status(status).json({
        message
    })
}

module.exports = errorHandler