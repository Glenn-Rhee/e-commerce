require("dotenv").config()
const mongoose = require("mongoose");

const { DB_HOSTMONGODB, DB_COLLECTION } = process.env;

mongoose.connect(`${DB_HOSTMONGODB}/${DB_COLLECTION}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});