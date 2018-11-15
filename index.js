const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const person = require('./models/person')

morgan.token('json', function(req, res) {
    return JSON.stringify(req.body)
})

const formatPerson = (person) => {
    return {
        id: person._id,
        name: person.name,
        number: person.number
    }
}

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())

app.use(morgan(':method :url :json :status :res[content-length] - :response-time ms'))

app.get('/api/persons', (req, res) => {
    person
      .find ({})
      .then(persons => {
          res.json(persons)
      })
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)

    const person = persons.find(p => p.id === id)

    if (person) {
        res.json(person)
    }
    else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    const data = '<p> puhelinluettolossa on ' + persons.length + ' henkilön tiedot</p>' +
                 '<p>' + new Date().toString() + '</p>'
    res.send(data)
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    
    if (body.name === undefined) {
        return res.status(400).json({"error": 'name must be defined'})
    }

    if (body.number === undefined) {
        return res.status(400).json({"error": 'number must be defined'})
    }

    if (persons.find(p => p.name === body.name) !== undefined) {
        return res.status(400).json({"error": 'name must be unique'})
    }

    const person = body
    person.id = Math.floor(Math.random() * Math.floor(1000))

    persons = persons.concat(person)
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("Server running on port", PORT)
})