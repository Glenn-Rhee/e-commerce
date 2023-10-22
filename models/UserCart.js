require("../config/mongodb");
const mongoose = require("mongoose");

const UserCart = mongoose.model("UserCart", {
    username: String,
    cart: []
})

module.exports = UserCart