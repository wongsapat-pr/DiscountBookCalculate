const express = require('express');
const bookRoute = express.Router();

// model
let bookModel = require('../models/book');

// Get book data
bookRoute.route('/').get((req, res, next) => {
    bookModel.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Create book data
bookRoute.route('/create-book').post((req, res, next) => {
    bookModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Edit book data
bookRoute.route('/edit-book/:id').get((req, res, next) => {
    bookModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data);
        }
    })
})

// Update book data
bookRoute.route('/update-book/:id').put((req, res, next) => {
    bookModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log('book successfully updated');
        }
    })
})

// Delete book data
bookRoute.route('/delete-book/:id').delete((req, res, next) => {
    bookModel.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})



module.exports = bookRoute;