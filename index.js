const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('json', function(req, res) {
    return JSON.stringify(req.body)
})

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())

app.use(morgan(':method :url :json :status :res[content-length] - :response-time ms'))

app.get('/api/persons', (req, res) => {
    Person
      .find ({})
      .then(persons => {
          res.json(persons.map(Person.format))
      })
})

app.get('/api/persons/:id', (req, res) => {    
    Person
      .findById(req.params.id)
      .then(person => {
        res.json(Person.format(person))
      })
})

app.get('/info', (req, res) => {
    Person
      .countDocuments({})
      .then(count => {
        const data = '<p> puhelinluettolossa on ' + count + ' henkilön tiedot</p>' +
        '<p>' + new Date().toString() + '</p>'

        res.send(data)
      })
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    
    if (body.name === undefined) {
        return res.status(400).json({"error": 'name must be defined'})
    }

    if (body.number === undefined) {
        return res.status(400).json({"error": 'number must be defined'})
    }

    const person = new Person({...body})
    
    person
      .save()
      .then(insertedPerson => {
          res.json(insertedPerson)
      })
})

app.put('/api/persons/:id', (req, res) => {
    person = {...req.body}
    console.log("person", person)
    Person
      .findOneAndUpdate({_id: req.params.id}, person, {new: true})
      .then(updatedPerson => {
          res.json(updatedPerson)
      })
      .catch(err => {
          console.log(err)
          res.status(400).send({error: 'no such id'})
      })
})

app.delete('/api/persons/:id', (req, res) => {
    Person
      .findByIdAndRemove(req.params.id)
      .then(result => {
          res.status(204).end()
      })
      .catch(error => {
          res.status(400).send({error: 'no such id'})
      })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("Server running on port", PORT)
})