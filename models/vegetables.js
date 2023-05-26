const mongoose = require('mongoose')

const vegSchema = new mongoose.Schema({
    name: { type: String, require: true}
})

const Vegetable = mongoose.model('Vegetable', vegSchema)

module.exports = Vegetable