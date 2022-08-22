const mongoose = require("mongoose");
//TODO change schema
const moduleSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    permissions: { type: Array },
    content: { type: Object },
});

module.exports = mongoose.model("uModule", moduleSchema);
