const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
    player_name: String,
    matches: Number,
    inns: Number,
    runs: Number,
    hs: Number,
    ave: Number
});

module.exports = schema;