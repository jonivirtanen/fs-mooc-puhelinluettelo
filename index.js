const express = require('express')
const app = express()

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
      },
      {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
      },
      {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
      },
      {
        "name": "Matti Meikäläinen",
        "number": "040-123456",
        "id": 5
      }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
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

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})
const PORT = 3001;
app.listen(PORT, () => {
    console.log("Server running on port", PORT)
})