const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.mesage || "Internal Server error";


    if (err.name === "CastError") {
        const message = `Resourse not found. Invalid: ${err.path}`;
        err = new ErrorHandler(messgae, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,

    });
};