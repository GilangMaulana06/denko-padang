const express = require('express');
const { readData, createData, updateData, deleteData, readSumberData } = require('../controllers/data.controller')
const { loginUser,createUser } = require('../controllers/user.contoller')

const router = express.Router()

router.get('/data', readData)
router.get('/data_sumber', readSumberData)
router.post('/data', createData)
router.put('/data/:id', updateData)
router.delete('/data/:id', deleteData)

router.get('/user', loginUser)
router.post('/user', createUser)

module.exports = router