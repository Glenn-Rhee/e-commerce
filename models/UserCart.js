require("../config/mongodb");
const mongoose = require("mongoose");

const UserCart = mongoose.model("UserCart", {
    username: String,
    cart: []
})

const phoneCart = mongoose.model("phone", {
    phone: []
})

module.exports = { UserCart, phoneCart }