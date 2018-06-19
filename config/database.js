if (process.env.NODE_ENV === 'production') {
    module.exports = { mongoURI: 'mongodb://bakar:0785351645wb@ds263460.mlab.com:63460/wabomba-bakar-portfolio' }
} else {
    module.exports = { mongoURI: 'mongodb://localhost/bakar' }
}