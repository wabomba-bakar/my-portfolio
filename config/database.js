if (process.env.NODE_ENV === 'production') {
    module.exports = { mongoURI: 'mongodb://bakar:wabombabakar@ds141454.mlab.com:41454/bakar-prod' }
} else {
    module.exports = { mongoURI: 'mongodb://localhost/bakar' }
}