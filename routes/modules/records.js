const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {

    const categoryInfo = []
    Category.find()
        .lean()
        .then(categories => {
            categories.filter(category => {
                categoryInfo.push({ name: category.name, id: category._id })
            })
        })
        .then(() => {
            res.render('new', { categories: categoryInfo.map(category => category.name) })
        })
        .catch(err => console.log(err))

})

router.post('/', (req, res) => {
    const { name, date, amount, category } = req.body
    if (!isNaN(amount)) {
        const record = new Record()
        record.name = name
        record.date = date
        record.amount = Number(amount)
        // record.userId = req.user._id
        // TODO
        record.userId = "61f515babd8e4c2e740a826f"

        Category.findOne({ name: category })
            .then(item => {
                record.categoryId = item._id
            })
            .then(() => {
                record.save()
            })
            .then(() => res.redirect('/'))
            .catch(err => console.log(err))

    } else {
        res.render('new', { name, date, amount, category })
    }

})

module.exports = router