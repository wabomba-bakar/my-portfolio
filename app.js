const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    exhbs = require('express-handlebars'),
    port = process.env.PORT || 5000,
    app = express();


//DB Config
const db = require('./config/database');


// Connect to Database
mongoose.connect(db.mongoURI)
    .then(function() {
        console.log('Connected to mongoDb...')
    })
    .catch(err => console.log(err));

//load messages model
require('./models/Message');
const Message = mongoose.model('messages');

// Import Messages route
const message = require('./routes/messages');

//view engine
app.engine('handlebars', exhbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');
//set stactic folder
app.use(express.static(__dirname + '/public'));

//body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


// Get Root routes
app.get('/', (req, res) => {
    res.render('index');
})



// Get Root routes
app.post('/', (req, res) => {
    const name = req.body.name,
        email = req.body.email,
        message = req.body.message;

    let errors = [];
    if (!req.body.name) {
        errors.push({
            text: 'Please enter your name.'
        })
    }
    if (!req.body.email) {
        errors.push({
            text: 'Please enter your email address.'
        })
    }
    if (!req.body.message) {
        errors.push({
            text: 'Please enter your message.'
        })
    }
    if (errors.length > 0) {
        res.render('index', {
            errors: errors,
            name: name,
            email: email,
            message: message
        })
    } else {
        const newMessage = {
            name: name,
            email: email,
            message: message
        }


        new Message(newMessage).save()
            .then(message => {
                res.redirect('/sent');
            })
    }
});

app.get('/messages', (req, res) => {
    Message.find({})
        .sort({ date: 'desc' })
        .then(messages => {
            res.render('messages', {
                messages: messages
            })
        })
})



// Get sent route
app.get('/sent', (req, res) => {
    res.render('sent');
})

//start server
app.listen(port, () => console.log(`server started on port: ${port}... `))