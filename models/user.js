const mongoose = require('mongoose')
const userScehma = mongoose.model('User', new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}))

module.exports = userScehma