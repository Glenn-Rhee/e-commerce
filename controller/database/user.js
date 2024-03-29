const { compare } = require("bcrypt");
const User = require("../../models/User");
const { encyrptPass } = require("../password/password");
const UserCart = require("../../models/UserCart");

const signUpController = async ({ username, password, email }) => {
    try {
        const isRegistered = await User.findOne({ where: { username } });
        if (isRegistered) {
            const err = new Error("Username already registered")
            throw err;
        }

        const encryptPass = await encyrptPass(password);
        const data = { username, email, password: encryptPass };
        const user = await User.create(data);
        const newUser = UserCart({
            username,
            cart: []
        })
        await newUser.save();
        return user;

    } catch (error) {
        return { status: "failed", statusCode: 403, message: error.message }
    }
}

const loginController = async ({ email, password }) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            const err = new Error("Unregistered Email");
            throw err
        }

        const hash = await user.password;
        const isCorrect = await compare(password, hash);
        if (!isCorrect) {
            const err = new Error("Wrong Password!");
            throw err
        };

        return user
    } catch (error) {
        return { status: "failed", statusCode: 403, message: error.message || "INTERNAL SERVER ERROR!" }
    }
}

module.exports = { signUpController, loginController }