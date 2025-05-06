const mongoose = require("mongoose");

const passwordValidator = function (value) {
    if (
        value.length < 8 ||
        !/[a-z]/.test(value) ||
        !/[A-Z]/.test(value) ||
        !/\d/.test(value) ||
        !/[!@#?]/.test(value)
    ) {
        return false;
    }
    return true;
};

const userSignupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name must be provided."],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email address is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
});

module.exports = mongoose.model("User", userSignupSchema);