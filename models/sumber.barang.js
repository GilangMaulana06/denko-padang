module.exports = mongoose => {

    const schema = mongoose.Schema(
        {
            nama_toko: String,
        }, {
        timestamps: true,
    }
    )

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id

        return object
    })

    return mongoose.model('sumber_barang', schema)
}