const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const Routes = require('./routes/userRoutes');
const expense = require('./routes/expenseRoutes');
const income = require('./routes/incomeroutes');

require('dotenv').config()

const app = express()
app.use(express.json())

app.use(cors())

app.use('/api/users',Routes)
app.use('/api/income',income)
app.use('/api/expense',expense)

const PORT = process.env.PORT || 1000


app.listen(process.env.PORT, () => {
    console.log(`Server started at ${PORT}`)
})


mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME
})
    .then(() => console.log(`Connected to Mongo DB`))
    .catch((err) => console.log(err))

mongoose.connection.on('connected', () => {
    console.log(`Connected to DB`)
})

mongoose.connection.on('error', (err) => {
    console.log("error", err)
})