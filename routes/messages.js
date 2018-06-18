const express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router();


// import message model
require('../models/Message');
const Message = mongoose.model('messages');


// Messages index route
router.get('/', (req, res) => {
    Message.find({})
        .sort({ date: 'desc' })
        .then(messages => {
            res.render('index', {
                messages: messages
            });
        })
})


// Process form
router.post('/', (req, res) => {
    let errors = [];

    if (!req.body.name) {
        errors.push({ text: 'Please add your name.' });
    }

    if (!req.body.email) {
        errors.push({ text: 'Please add your email address.' });
    }

    if (!req.body.message) {
        errors.push({ text: 'Please add your message.' });
    }

    if (errors.length > 0) {
        res.render('/', {
            errors: errors,
            title: req.body.name,
            details: req.body.email,
            details: req.body.message
        })
    } else {
        const newUser = {
            title: req.body.title,
            details: req.body.details
        }
        new Message(newUser)
            .save()
            .then(message => {
                req.flash('success_msg', 'Thanks. Message successfully sent.');
                res.redirect('/');
            });
    }
});

// Get form routes
router.get('/', (req, res) => {
    res.render('index');
})

module.exports = router;