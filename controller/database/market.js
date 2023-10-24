const { phoneCart } = require("../../models/UserCart")
const { v4 } = require("uuid")

const addPhone = async (merk, id) => {
    try {
        let oldPhone = await phoneCart.find();
        oldPhone = oldPhone[0].phone

        const phones = await phoneCart.findByIdAndUpdate(id, {
            phone: [...oldPhone,
            {
                id: v4(),
                merk,
                phones: []
            }
            ]
        }, { new: true })


        if (!phones) {
            const err = new Error("Gagal menambahkan data!");
            throw err
        }

        return phones
    } catch (error) {
        return { status: "failed", statusCode: 403, message: error.message }
    }
}

const newPhone = async (merk) => {
    try {
        const newPhones = await phoneCart({
            phone: [{ id: v4(), merk, phones: [] }]
        })

        const phones = await newPhones.save();
        if (!phones) {
            const err = new Error("Gagal Menambahkan data!");
            throw err
        }
        return phones
    } catch (error) {
        return { status: "failed", statusCode: 403, message: error.message }
    }
}

const addTypePhone = async (data, id) => {
    try {
        if (!data) {
            const err = new Error("Data mobile phone diperlukan");
            throw err
        }

        const dataPhones = await phoneCart.findOne()

        if (!dataPhones) {
            const err = new Error("Id tidak ditemukan!");
            throw err;
        }
        const phones = await dataPhones.phone;

        let newDataPhone = await phones.map(phone =>
            phone.id == id ?
                { ...phone, phones: [...phone.phones, data] }
                : phone
        )

        newDataPhone = await phoneCart.findByIdAndUpdate("6535bcc7acb98716661e20ed", {
            phone: [...newDataPhone]
        }, { new: true })

        return newDataPhone
    } catch (error) {
        return { status: "failed", statusCode: 403, message: error.message }
    }
}

const getAllDataPhone = async () => {
    try {
        const data = await phoneCart.find();
        if (!data) {
            const err = new Error("Gagal mendapatkan semua data!");
            throw err;
        }

        return data;
    } catch (error) {
        return { status: "failed", statusCode: 403, message: error.message || "Server Error!" }
    }
}

// (async () => {
//     const data = await addTypePhone("6535bcc7acb98716661e20ed");
//     // console.log(data);
//     // console.log(data);
//     const newData = data.map(d =>
//         d.id == "88e5e5c4-89ac-4490-b16b-923ffcdcb21a" ? { ...d, phones: [...d.phones, { id: 123456, type: "Samsung J2 Prime" }] } : d
//     )

//     console.log(newData[0].phones);
// })()

module.exports = { addPhone, newPhone, addTypePhone, getAllDataPhone }