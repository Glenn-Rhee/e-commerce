const User = require("../../models/User");
const UserCart = require("../../models/UserCart");

const cartUserController = async (username, cart) => {
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            const err = new Error("Unregistered Username");
            throw err
        }

        const isRegistered = await UserCart.findOne({ username });
        if (!isRegistered) {
            const err = new Error("Unregistered Username");
            throw err
        }

        const oldCart = await isRegistered.cart;
        const newCart = await UserCart.findOneAndUpdate({ username }, {
            cart: [...oldCart, cart]
        }, { new: true })

        return newCart
    } catch (error) {
        return { status: "failed", statusCode: 403, message: error.message }
    }
}

module.exports = { cartUserController }