const {userService}  = require("../services");
const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};


const register = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    if (!(email && password )) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    const newUser = await userService.register(email, password);
    if (newUser.isErr) {
        return res.status(400).json(newUser.err);
    }else {
        res.status(200).json({token:newUser.token });
    }

})

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    if (!(email && password )) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await userService.login(email, password);
    if (user.isErr) {
        return res.status(400).json(user.err);
    }else {
        res.status(200).json({token:user.token });
    }
})

module.exports = { login, register };
