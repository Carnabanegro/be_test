const express = require("express");
const {create} = require("../controllers/uModule.controller");
const router = express.Router();

router.post("/create", (req, res, next) => {
    return create(req, res, next);
});
