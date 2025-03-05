module.exports = mongoose => {

    const schema = mongoose.Schema(
        {
            nama_item: String,
            stok: Number,
            // type: String,
            brand: String,
            ukuran: String,
            modal: String,
            harga_ecer: String,
            // harga_grosir: String,
            // sumber_barang : String,
        }, {
        timestamps: true,
    }
    )

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id

        return object
    })

    return mongoose.model('data_barang', schema)
}