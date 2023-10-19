const bcrypt = require("bcrypt")
const saltRound = 15

const encyrptPass = async (password) => {
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

const compare = async (password, hashPw) => {
    const isCorrect = await bcrypt.compare(password, hashPw);
    return isCorrect
}

module.exports = { encyrptPass, compare }