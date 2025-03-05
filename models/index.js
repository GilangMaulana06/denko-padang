const dbConfig = require('../config/database')
const mongoose = require('mongoose')

module.exports = {
    mongoose,
    URL: dbConfig.url,
    data: {
        barang: require('./data.model')(mongoose),
        user: require('./user.model')(mongoose),
        sumber : require('./sumber.barang')(mongoose),
    }
}