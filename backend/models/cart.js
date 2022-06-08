const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cartSchema = new Schema({
    bookId: {
        type: Number
    },
    name: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },

}, {
    collection: 'cart'
})

module.exports = mongoose.model('cart', cartSchema);