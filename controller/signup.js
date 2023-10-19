const { signUpController } = require("./database/user");
const { validationResult } = require("express-validator")

const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const msgError = errors.array()[0].msg;
            const err = new Error(msgError);
            throw err
        }

        if (!username || !password || !email) {
            const err = new Error("Username, password, and email is required")
            throw err
        }

        const user = await signUpController({ username, password, email });
        if (user.status && user.status == "failed") {
            throw user
        }

        res.json({ status: "success", statusCode: 200, message: "Thanks for joining to us", user });

    } catch (error) {
        res.json({ status: "failed", statusCode: 403, message: error.message })
    }
}

module.exports = { signUp }