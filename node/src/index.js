const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const cricket = require('./cricket');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());

app.use('/', cricket)

app.listen(5000, async () => {
    await mongoose.connect('mongodb://localhost:27017/app');
    console.log("App is running on http://localhost:5000")
})