const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const recordScehma = require('../../models/record')

router.get('/login', (req, res) => {
    res.render('login')
})

module.exports = router