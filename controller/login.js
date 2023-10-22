const { validationResult } = require("express-validator");
const { loginController } = require("./database/user");

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            const err = new Error("Email or password is required")
            throw err
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const msgError = errors.array()[0].msg;
            const err = new Error(msgError);
            throw err
        }

        const user = await loginController({ email, password });
        
        if (user.status && user.status == "failed") {
            throw user
        }

        res.json({ status: "success", statusCode: 200, message: "Success login", user })
    } catch (error) {
        res.json({ status: "failed", statusCode: 403, message: error.message })
    }

}

module.exports = { login }