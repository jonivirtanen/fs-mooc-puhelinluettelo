const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
const url = 'mongodb://<user>:<pass>@ds123796.mlab.com:23796/fs-mooc-puhelinluettelo'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String,
})

if (process.argv.length === 4) {
    const person = new Person({
        name: process.argv[2],
        number: process.argv[3]
    })

    person
      .save()
      .then(response => {
        console.log(`lisätään henkilö ${person.name} numero ${person.number} luetteloon`)
        mongoose.connection.close()
      })
      return;
}

Person
  .find({})
  .then(persons => {
    console.log("puhelinluettelo:")
    persons.map(p => console.log(p.name, p.number))
    mongoose.connection.close()
  })
