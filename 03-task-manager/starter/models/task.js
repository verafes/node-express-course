const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "must provide name"],
        thim: true,
        min: [2, "name must be at least 2 characters"],
        max: [20, "name can not be more than 20 characters"],
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Task", TaskSchema);