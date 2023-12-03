const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchasynerror");
const User = require("../models/userModel");
const sendToken = require("../utils/Jwttoken");
const sendEmail = require("../utils/sendEmail");


exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is sample id",
            url: "profile url",
        },
    });

    sendToken(user, 201, res);

});


exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("please enter email and password", 404))
    }

    const user = await user.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email and password", 401));

    }

    const isPasswordMatched = user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email and password", 401));
    }
    sendToken(user, 200, res);
});


exposts.logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "logged out",
    });

});

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await user.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("User not Found", 404));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocal}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message = `Your password rest token is :- \n\n ${resetPasswordUrl}\n\n, If this email is not done by you, so please ignore it`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });
        res.status(200).json({
            success: true,
            message: `email send to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});