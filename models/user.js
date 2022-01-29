const mongoose = require('mongoose')
const userScehma = mongoose.model('User', new mongoose.Schema({
    name: String
}))

module.exports = userScehma