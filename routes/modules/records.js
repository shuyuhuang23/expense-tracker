const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const recordScehma = require('../../models/record')

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
    if (!isNaN(amount) && category !== '類別') {
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
        const filterCategoryName = []
        const record = { name, date, amount, category }
        Category.find()
            .lean()
            .then(categories => {
                categories.filter(categoryInfo => {
                    if (categoryInfo.name !== category) {
                        filterCategoryName.push(categoryInfo.name)
                    }
                })
                res.render('new', { record, categories: filterCategoryName })
            })
    }

})

router.get('/:record_id/edit', (req, res) => {
    const recordId = req.params.record_id
    const filterCategoryName = []
    Record.findOne({ _id: recordId })
        .populate('categoryId')
        .lean()
        .then(record => {
            Category.find()
                .lean()
                .then(categories => {
                    categories.filter(category => {
                        if (!record.categoryId._id.equals(category._id)) {
                            filterCategoryName.push(category.name)
                        }
                    })

                    const revisedRecord = {
                        name: record.name,
                        date: record.date,
                        amount: record.amount,
                        _id: record._id,
                        category: record.categoryId.name
                    }
                    res.render('edit', { record: revisedRecord, categories: filterCategoryName })
                })
        })
        .catch(err => console.log(err))

})

router.put('/:record_id', (req, res) => {
    const recordId = req.params.record_id

    //TODO: 檢查金額是否為數字
    Record.findOne({ _id: recordId })
        .then(record => {
            record.name = req.body.name
            record.date = req.body.date
            record.amount = req.body.amount
            Category.findOne({ name: req.body.category })
                .then(category => {
                    record.categoryId = category._id
                    return record.save()
                })
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))

})

router.delete('/:record_id', (req, res) => {
    const recordId = req.params.record_id
    console.log(recordId)
    return Record.findOne({ _id: recordId })
        .then(record => record.remove())
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

module.exports = router