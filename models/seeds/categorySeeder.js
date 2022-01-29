const Category = require('../category')

const db = require('../../config/mongoose')

const CategoryList = require('./category.json')

db.once('open', () => {
    Promise
        .all(Array.from(CategoryList, (_, i) => {
            return Category.create({
                name: CategoryList[i].name,
                icon: CategoryList[i].icon
            })
        }))
        .then(() => {
            console.log('Insert cateogory data.')
            process.exit()
        })
})