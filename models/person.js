const mongoose = require('mongoose')

const url = 'mongodb://mongoadmin:SDqqh4D5G3hJfTbX@ds123796.mlab.com:23796/fs-mooc-puhelinluettelo'

mongoose.connect(url)

const Person = mongoose.model('Person', {
    id: String,
    name: String,
    number: String
})

module.exports = Person