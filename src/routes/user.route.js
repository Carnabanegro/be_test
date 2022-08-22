const express = require("express");
const {login, register} = require("../controllers/user.controller");

const router = express.Router();

router.post("/login",  (req, res, next) => {
    return login(req, res, next);
});

router.post("/register",  (req, res, next) => {
    return  register(req, res, next);
});


module.exports = router;
