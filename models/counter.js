const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const counterSchema = new Schema({
    title : String,
    sequence_value : Number
});
module.exports = mongoose.model('Counter', counterSchema);