const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchasynerror");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


exports.isAuthticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("please login to acces this resourses", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
})

exposts.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(
                `Role: ${req.user.role} is not allowed to access this resourse`, 403
            ));
        }
        next();
    };
};