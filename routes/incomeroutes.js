const express = require('express');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/incomeController');
const { requireLogin } = require('../authMiddleware/requireLogin');


const Routes = express.Router()

Routes.post('/add-income', requireLogin, addIncome)
Routes.get('/get-income', requireLogin, getIncomes)
Routes.delete('/delete-income/:id', requireLogin, deleteIncome)

module.exports = Routes