const User = require("../model/user");
const {createHash} = require('crypto');
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

const login = async (email, password) => {
    if (!(email && password )) {
        return { isErr: true, err: { message: "Email and password are required" } };
    }
    const user = await User.findOne({ email });
    if (!user) {
        return { isErr: true, err: { message: "Invalid email or password" } };
    }
    const isMatch = await (user.password === createHash('sha256').update(password+'').digest("hex"));
    if(isMatch) {
        const token = jwt.sign({ id: user._id, username: email }, process.env.CONFIG_TOKEN_KEY, { expiresIn: "12h" });
        return { isErr: false, token };
    }
}


const register = async (email, password, profile) => {
    if (!(email && password)) {
        return { isErr: true, err: { message: "Email and password are required" } };
    }
    const user = await User.findOne({ email });
    if (user) {
        return { isErr: true, err: { message: "User already exists" } };
    }
    if(password.length > 30 || password.length < 8) {
        return { isErr: true, err: { message: "Password is wrong, maybe too long, maybe too short" } };
    }

    const newUser = await User.create(
        {
            email, password:createHash('sha256').update(password+'').digest("hex"),
            createdAt: new Date(), updatedAt: new Date()
        })

    const token = jwt.sign({ id: newUser._id }, process.env.CONFIG_TOKEN_KEY, { expiresIn: "12h" });
    return { isErr: false, token };
}

module.exports = {
    register, login, verifyToken
}
