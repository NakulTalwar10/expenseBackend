const express = require('express');
const { addExpense, getExpense, deleteExpense } = require('../controllers/expenseController');
const { requireLogin } = require('../authMiddleware/requireLogin');


const Routes = express.Router()


Routes.post('/add-expense', requireLogin, addExpense)
Routes.get('/get-expense', requireLogin, getExpense)
Routes.delete('/delete-expense/:id', requireLogin, deleteExpense)


module.exports = Routes