const mongoose = require('mongoose')
const categoryScehma = mongoose.model('Category', new mongoose.Schema({
    name: String,
    icon: String
}))

module.exports = categoryScehma