const mongoose = require('./connect')

const Schema = mongoose.Schema
// Schema
const BasicSchema = new Schema({
    name: String
})

// Model
const Basic = mongoose.model('Basic', BasicSchema)

// Document
const document = new Basic({
    name: '123'
})

document.save()