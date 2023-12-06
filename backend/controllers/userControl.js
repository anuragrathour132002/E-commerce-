const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchasynerror");
const User = require("../models/userModel");
const sendToken = require("../utils/Jwttoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");


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

exports.resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await user.findOne({
        resetPasswordToken, resetPasswordToken: { $gt: Date.now() },
    })
    if (!user) {
        return next(new ErrorHandler("reset passowrd token is invalid or has been expire", 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);
})



exports.getUserdetail = catchAsyncError(async (req, res, next) => {
    const user = User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    });

});

exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await user.findById(req.user.id).select("+password");
    const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("old password is oncorrect", 400));
    }
    if (req.body.newpassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("passeord does not match", 400));
    }
    user.password = req.body.newpassword;
    await user.save();
    sendToken(res, 200, token);
});

exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserDate = {
        name: req.body.name,
        email: req.body.email,
    };

    const user = await user.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,

    });
    req.status(200).json({
        success: true,
    });
});


exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await user.find();

    res.status(200).json({
        success: true,
        users,
    });
});

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await user.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exit with id: ${req.params.is}`)
        );
    }

    res.status(200).json({
        success: true,
        user,
    });

});

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const newUserDate = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    const user = await user.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,

    });
    req.status(200).json({
        success: true,
    });
});

exports.deletUser = catchAsyncError(async (req, res, next) => {
    const user = await user.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not exit with this id${req.params.id}`))
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User delete successfully",
    });
});






