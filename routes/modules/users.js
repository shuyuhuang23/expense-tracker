const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')

// const Record = require('../../models/record')
// const Category = require('../../models/category')
const User = require('../../models/user')

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if (!name || !email || !password || !confirmPassword) {
        errors.push({ message: 'All required fields must be filled out.' })
    }
    if (password !== confirmPassword) {
        errors.push({ message: 'Two passwords are not the same.' })
    }
    if (errors.length) {
        return res.render('register', {
            errors,
            name,
            email
        })
    }
    User.findOne({ email })
        .then(user => {
            if (user) {
                errors.push({ message: 'This Email has been registered.' })
                return res.render('register', {
                    errors,
                    name,
                    email
                })
            }
            return bcrypt.genSalt(10)
                .then(salt => bcrypt.hash(password, salt))
                .then(hash => User.create({
                    name,
                    email,
                    password: hash
                }))
                .then(() => res.redirect('/'))
                .catch(err => console.log(err))
        })

})

module.exports = router