const mongoose = require('mongoose')

const url = 'mongodb://<user>:<pass>@ds123796.mlab.com:23796/fs-mooc-puhelinluettelo'

mongoose.connect(url)

const pSchema = mongoose.Schema({
    id: String,
    name: String,
    number: String
})

pSchema.statics.format = function(person, cb) {
    const formattedPerson = {
        ...person._doc,
        id: person._id
    }

    delete formattedPerson._id
    delete formattedPerson.__v
    return formattedPerson
}

const Person = mongoose.model('Person', pSchema)

module.exports = Person