const mongoose = require('mongoose')

const url = 'mongodb://localhost/test'
monogoose.connect(url)

const db = mongoose.connection
db.on('error', function(err) {
    console.log(err)
})
db.on('once', function() {
    console.log('connect')
})

module.exports = mongoose