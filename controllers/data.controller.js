const db = require('../models')
const data = db.data.barang
const dataSumber = db.data.sumber

const readSumberData = async (req, res) => {
    try {
        const response = await dataSumber.find({
        })
            .sort({ nama_toko: 1 })
        res.status(200).json({ data: response })
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}

const createSumberData = async (value) => {
    if (value !== '-') {
        const response = await dataSumber.find({
            nama_toko: value,
        })
        if (response.length === 0) {
            console.log('CREATE SUMBER TOKO')
            dataSumber.create({
                nama_toko: value
            })
        }
    }
}

const readData = async (req, res) => {
    console.log('READ')
    const { nama, ukuran, type, brand, sumber_barang } = req.query
    console.log(nama)

    const regexNama = new RegExp(nama, 'i')
    const regexType = new RegExp(type, 'i')
    const regexBrand = new RegExp(brand, 'i')
    const regexSumberBarang = new RegExp(sumber_barang, 'i')
    let regexUkuran

    if (ukuran?.includes('*')) {
        regexUkuran = new RegExp(ukuran.replace('*', `\\*`), 'i')
    } else {
        regexUkuran = new RegExp(ukuran, 'i')
    }

    try {

        const response = await data.find({
            nama_item: regexNama,
            // ukuran: regexUkuran,
            // type: regexType,
            // brand: regexBrand,
            // sumber_barang: regexSumberBarang
        })
            .sort({ nama_item: 1, brand: 1 })

        res.status(200).json({ data: response })
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}

const createData = (req, res) => {
    console.log('CREATE')
    data.create(req.body)
        .then((response) => {
            //         createSumberData(req.body.sumber_barang)
            res.json(response).status(200)
        })
        .catch(err => res.status(400).send({ message: err.message }))
}

const updateData = (req, res) => {
    console.log('UPDATE')
    data.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            nama_item: req.body.nama_item,
            stok: req.body.stok,
            // type: req.body.type,
            // brand: req.body.brand,
            // ukuran: req.body.ukuran,
            // modal: req.body.modal,
            // harga_ecer: req.body.harga_ecer,
            // harga_grosir: req.body.harga_grosir,
            // sumber_barang: req.body.sumber_barang,
        }
    }, { returnOriginal: false })
        .then((response) => {
            // createSumberData(req.body.sumber_barang)
            if(response === null){
                res.status(404).send('Data tidak ditemukan')
            } else {
                res.json(response).status(200)
            }
        })
        .catch(err => res.status(400).send({ message: err.message }))
}

const deleteData = (req, res) => {
    console.log('DELETE')
    data.findOneAndDelete(({ _id: req.params.id }))
        .then(() => res.json({ message: 'Delete Berhasil' }).status(200))
        .catch(err => res.status(400).send({ message: err.message }))
}

module.exports = {
    readData,
    readSumberData,
    createData,
    updateData,
    deleteData,
}