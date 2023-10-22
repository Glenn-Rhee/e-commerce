var express = require('express');
const { login } = require('../controller/login');
const { signUp } = require('../controller/signup');
const { check } = require("express-validator");
const { addCartUser } = require('../controller/cartUser');
var router = express.Router();

/* GET users listing. */
router.post('/login', [
    check("email", "Please fill email properly").isEmail()
], login);

router.post("/sign-up", [
    check("email", "Please fill email properly").isEmail()
], signUp)

router.post("/cart", addCartUser)

module.exports = router;
