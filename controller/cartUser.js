const { cartUserController } = require("./database/cartUserController");

const addCartUser = async (req, res) => {
    const { username } = req.query;
    const { cart } = req.body

    try {
        if (!username || !cart) {
            const err = new Error("Username and Cart is required");
            throw err
        }
        
        const resultKey = !("id" in cart) ||
        !("productName" in cart) ||
        !("quantity" in cart) ||
        !("price" in cart) ||
        !("totalPrice" in cart) ? false : true
        
        if (!resultKey) {
            const err = new Error("id, productName, quantity, price, and totalPrice are required");
            throw err;
        }
        
        const uname = username.split("+").join(" ");
        const newCartUser = await cartUserController(uname, cart);

        res.json(newCartUser)
    } catch (error) {
        return res.json({ status: "failed", statusCode: 403, message: error.message })
    }
}

module.exports = { addCartUser }