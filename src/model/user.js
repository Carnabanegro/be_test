const mongoose = require("mongoose");
//TODO change schema
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String },
    profile: { type: Object },
});

module.exports = mongoose.model("user", userSchema);
