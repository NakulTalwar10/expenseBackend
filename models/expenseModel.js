const mongoose = require('mongoose')

const Schema = mongoose.Schema

const expenseSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
        maxLength: 20
    },
    type: {
        type: String,
        default: "expenses"
    },
    date: {
        type: Date,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
}, { timestamps: true })

const expense = mongoose.model('expenses', expenseSchema)
module.exports = expense