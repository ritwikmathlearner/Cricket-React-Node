const mongoose = require('mongoose');
const cricketSchema = require('./schema');

const model = mongoose.model('Cricket', cricketSchema, 'cricket');

module.exports = model;