const db = require('../models')
const data = db.data.user

const loginUser = (req, res) => {
    console.log('LOGIN USER')
    data.find({
        email: req.body.email,
        password: req.body.password
    })
        .then((response) => {
            if(response.length === 0){
                res.json({ message: 'Login gagal' }).status(201)
            } else {
                res.json({ message: 'Login berhasil' }).status(200)
            }
        })
        .catch(err => res.status(400).send({ message: err.message }))
}

const createUser = (req, res) => {
    console.log('CREATE USER')
    data.create(req.body)
        .then((response) => res.json(response).status(200))
        .catch(err => res.status(400).send({ message: err.message }))
}

module.exports = {
    loginUser,
    createUser
}