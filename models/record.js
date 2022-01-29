const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordScehma = mongoose.model('Record', new mongoose.Schema({
    name: String,
    date: String,
    amount: Number,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        index: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}))

module.exports = recordScehma