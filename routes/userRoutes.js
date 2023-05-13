const express = require('express');
const { register, login, getCurrentUser} = require('../controllers/userController');
const { requireLogin } = require('../authMiddleware/requireLogin');
const Routes= express.Router()


Routes.post('/register',register)
Routes.post('/login',login)
Routes.get('/me', requireLogin, getCurrentUser); // The getCurrentUser route is protected with the requireLogin middleware

module.exports=Routes