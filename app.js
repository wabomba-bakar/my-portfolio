const express = require('express'),
    mongoose = require('mongoose'),
    // Nexmo = require('nexmo'),
    // socketio = require('socket.io'),
    bodyParser = require('body-parser'),
    exhbs = require('express-handlebars'),
    port = process.env.PORT || 5000,
    app = express();

// Init Nexmo
// const nexmo = new Nexmo({
//     apiKey: '',
//     apiSecret: ''
// }, {
//     dedug: true
// });

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
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        })
    } else {
        const newMessage = {
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        }
        new Message(newMessage).save()
            .then(message => {

                // nexmo.message.sendSms(
                //     'your virtual number', name, email, message, {
                //         type: 'unicode'
                //     },
                //     (err, responseData) => {
                //         if (err) {
                //             console.log(err);
                //         } else {
                //             console.dir(responseData);
                //             // Get data from the response
                //             const data = {
                //                 id: responseData.messages[0]['message-id']
                //             }
                res.redirect('/sent');
                //             //Emit to the client
                //             io.emit('smsStatus', data);
                //         }
                //     }
                // );


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


// Connect to socket.io
// const io = socketio(server);
// io.on('connection', (socket) => {
//     console.log('connected to socket.io')
// });

// io.on('disconnect', () => {
//     console.log('Disconnected');
// });