const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
}

const url = process.env.MONGODB_URI

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