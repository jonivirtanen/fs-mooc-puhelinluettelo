const mongoose = require('mongoose')

const url = 'mongodb://<user>:<pass>@ds123796.mlab.com:23796/fs-mooc-puhelinluettelo'

mongoose.connect(url)

const Person = mongoose.model('Person', {
    id: String,
    name: String,
    number: String
})

module.exports = Person