const express = require("express");
const router = express.Router();

const user = require('./user.route')


const defaultRoutes = [
    {
        path: "/users",
        route: user,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
