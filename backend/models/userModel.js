const mongoose = require("mongoose");
const validator = require("validatorjs");
const bcrypt = require("bcryptjs");
const jwt = require("jwtwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Plase enter your name"],
        maxLength: [30, "name should not be more than 30 characher"],
        minLength: [4, "name should have 4 character"],
    },

    email: {
        typr: String,
        required: [true, "Please enter your emeil"],
        unique: true,
        validate: [validate.isEmail, " Please enter a valid email"],
    },

    password: {
        type: String,
        required: [true, "Please enter your passwor"],
        minlength: [true, "password should be greater than 8 character"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: "user",
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,

})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
};

module.exports = mongoose.model("user", userSchema);