const { compare } = require("bcrypt");
const User = require("../../models/User");
const { encyrptPass } = require("../password/password");

const signUpController = async ({ username, password, email }) => {
    try {
        const isRegistered = await User.findOne({ username });
        if (isRegistered) {
            const err = new Error("Username already registered")
            throw err;
        }

        const encryptPass = await encyrptPass(password);
        const data = { username, email, password: encryptPass };
        const user = User.create(data);
        return user;

    } catch (error) {
        return { status: "failed", statusCode: 403, message: error.message }
    }
}

const loginController = async ({ email, password }) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            const err = new Error("Unregistered Email");
            throw err
        }

        const hash = await user.password;
        const isCorrect = await compare(password, hash);
        if (!isCorrect) throw isCorrect;

        

    } catch (error) {
        return { status: "failed", statusCode: 403, message: error.message || "INTERNAL SERVER ERROR!" }
    }
}

module.exports = { signUpController, loginController }