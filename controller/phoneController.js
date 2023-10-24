const { addPhone, newPhone, addTypePhone, getAllDataPhone } = require("./database/market")

const phoneController = async (req, res) => {
    const { phone, dataPhone } = req.body
    const { id } = req.query

    try {
        // const data = await addPhone(phone, id);
        // const data = await newPhone(phone)
        const data = await addTypePhone(dataPhone, id)
        if (data.status && data.status == "failed") {
            throw data
        }
        res.json(data)
    } catch (error) {
        res.json({ status: "failed", statusCode: 403, message: error.message })
    }
}

const getAllPhones = async (req, res) => {
    try {
        const data = await getAllDataPhone();
        if (data.status && data.status == "failed") {
            throw data
        };

        res.json({ status: "Success get All data", statusCode: 200, data })
    } catch (error) {
        res.json({ status: "failed", statusCode: 403, message: error.message })
    }
}

module.exports = { phoneController, getAllPhones }