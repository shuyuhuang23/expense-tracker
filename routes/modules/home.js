const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
    const categoryNames = []
    const recordsInfo = []
    const categorySortName = req.query.category_bar || '類別'
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
                        if ((categorySortName === '類別') || (categorySortName === record.categoryId.name)) {
                            totalAmount += Number(record.amount)
                            recordsInfo.push({
                                name: record.name,
                                date: record.date,
                                amount: record.amount,
                                icon: record.categoryId.icon
                            })
                        }


                        // Category.findOne({ id: record.categoryId })
                        //     .lean()
                        //     .then(category => recordsInfo.push({
                        //         name: record.name,
                        //         date: record.date,
                        //         amount: record.amount,
                        //         icon: category.icon
                        //     }))

                    })
                    res.render('index', { categories: categoryNames, records: recordsInfo, totalAmount, category: categorySortName })
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


