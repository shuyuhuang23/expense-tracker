const User = require('../user')
const Record = require('../record')
const Category = require('../category')

const db = require('../../config/mongoose')

const UserList = require('./user.json')
const RecordList = require('./record.json')
const CategoryList = require('./category.json')

db.once('open', () => {


    Promise
        .all(Array.from(UserList, (_, i) => {
            return User.create({
                name: UserList[i].name
            })
        }))
        .then(() => {
            console.log('Insert user data.')
        })

    Category.find()
        .lean()
        .then(categories => {
            RecordList.forEach(record => {
                const categoryName = CategoryList.find(category => category.id === record.categoryId).name
                const categoryId = categories.find(category => category.name === categoryName)._id

                const userName = UserList.find(user => user.id === record.userId).name

                User.findOne({ name: userName })
                    .lean()
                    .then(user => {
                        Record.create({
                            name: record.name,
                            date: record.date,
                            amount: record.amount,
                            userId: user._id,
                            categoryId: categoryId
                        })
                    })

            })
        })
        .then(() => {
            console.log('Insert record data.')
        })
        .catch(err => console.log(err))

    // Category.find()
    //     .lean()
    //     .then(categories => {
    //         Promise
    //             .all(Array.from(RecordList, (_, i) => {
    //                 const record = RecordList[i]
    //                 const categoryName = CategoryList.find(category => category.id === record.categoryId).name
    //                 const categoryId = categories.find(category => category.name === categoryName)._id

    //                 const userName = UserList.find(user => user.id === record.userId).name
    //                 return User.findOne({ name: userName })
    //                     .lean()
    //                     .then(user => {
    //                         Record.create({
    //                             name: record.name,
    //                             date: record.date,
    //                             amount: record.amount,
    //                             userId: user._id,
    //                             categoryId: categoryId
    //                         })
    //                         console.log(record.name)
    //                     })
    //             }))
    //             .then(() => {
    //                 console.log('Insert record data.')
    //                 process.exit()

    //             })

    //     })
    //     .catch(err => console.log(err))


    // Promise
    //     .all(Array.from(UserList, (_, i) => {
    //         return User.create({
    //             name: UserList[i].name
    //         })
    //     }))
    //     .then(() => {
    //         console.log('Insert user data.')
    //         //process.exit()
    //     })

    // Promise
    //     .all(Array.from(RecordList, (_, i) => {
    //         return Record.create({
    //             name: RecordList[i].name,
    //             date: RecordList[i].date,
    //             amount: RecordList[i].amount,
    //             userId: RecordList[i].userId,
    //             categoryId: RecordList[i].categoryId
    //         })
    //     }))
    //     .then(() => {
    //         console.log('Insert record data.')
    //         // process.exit()
    //     })


    // console.log('Done')
})