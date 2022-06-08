const express = require('express');
const cartRoute = express.Router();

// model
let cartModel = require('../models/cart');


// Get cart data
cartRoute.route('/').get((req, res, next) => {
    cartModel.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Create book data
cartRoute.route('/addtocart').post(async (req, res, next) => {

    const book = await cartModel.findOne({
        bookId: req.body.bookId
    });
    if (book) {
        // console.log("book exists");
        cartModel.findOneAndUpdate({
            bookId: req.body.bookId
        }, {
            quantity: book.quantity + 1
        }, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
                console.log('cart successfully updated');
            }
        })
    } else {
        cartModel.create(req.body, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        })
    }

});

// Delete book from cart
cartRoute.route('/deleteincart/:id').delete((req, res, next) => {
    cartModel.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

// Update cart data
cartRoute.route('/add/:id').put((req, res, next) => {
    cartModel.findByIdAndUpdate(req.params.id, {
        bookId: req.body.bookId,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity + 1
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log('cart successfully updated');
        }
    })
})

// Update cart data
cartRoute.route('/sub/:id').put((req, res, next) => {
    cartModel.findByIdAndUpdate(req.params.id, {
        bookId: req.body.bookId,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity - 1,
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log('cart successfully updated');
        }
    })
})

module.exports = cartRoute;