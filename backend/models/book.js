const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookSchema = new Schema({
    bookId: {
        type: Number
    },
    name: {
        type: String
    },
    price: {
        type: Number
    },

}, {
    collection: 'book'
})

module.exports = mongoose.model('book', bookSchema);