const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
    const categoryNames = []
    const recordsInfo = []
    Category.find()
        .lean()
        .then(categories => {
            categories.filter(category => {
                categoryNames.push(category.name)
            })

            Record.find()
                .populate('categoryId')
                .sort({ date: 'asc', id: 'asc' })
                .lean()
                .then(records => {
                    let totalAmount = 0
                    records.filter(record => {
                        totalAmount += Number(record.amount)
                        console.log(record)
                        // recordsInfo.push({
                        //     name: record.name,
                        //     date: record.date,
                        //     amount: record.amount,
                        //     icon: record.categoryId.icon
                        // })
                        // Category.findOne({ id: record.categoryId })
                        //     .lean()
                        //     .then(category => recordsInfo.push({
                        //         name: record.name,
                        //         date: record.date,
                        //         amount: record.amount,
                        //         icon: category.icon
                        //     }))

                    })
                    console.log(recordsInfo)
                    res.render('index', { categories: categoryNames, records: recordsInfo, totalAmount })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))

    // console.log(tt[0])


    // Promise
    //     .all(Array.from(CategoryList, (_, i) => {
    //         return Category.create({
    //             id: CategoryList[i].id,
    //             name: CategoryList[i].name,
    //             icon: CategoryList[i].icon
    //         })
    //     }))
    //     .then(() => {
    //         console.log('Insert cateogory data.')
    //         process.exit()
    //     })


    // Record.find()
    //     .lean()
    //     .then(records => {

    //         res.render('index', { records })
    //     })
    //     .catch(err => console.log(err))

})

module.exports = router