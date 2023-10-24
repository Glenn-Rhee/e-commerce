var express = require('express');
const { phoneController, getAllPhones } = require('../controller/phoneController');
var router = express.Router();

/* GET home page. */
router.post('/phone', phoneController);
router.get("/phone", getAllPhones)

module.exports = router;
