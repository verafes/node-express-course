let { people } = require('../data');

const getPeople = (req, res) => {
    res.status(200).json({ success: true, data: people });
};

const addPerson = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res
            .status(400)
            .json({ success: false, message: 'Please provide a name' });
    }
    const newPerson = { id: people.length + 1, name };
    people.push(newPerson);
    res.status(201).json({ success: true, name });
};

const getPerson = (req, res) => {
    const id = parseInt(req.params.id);
    const person = people.find(p => p.id === id);
    if (!person) {
        return res.status(404).json({ message: 'Person not found' });
    }
    res.status(200).json({ success: true, data: person });
};

const updatePerson = (req, res) => {
    const { name } = req.body;
    const person = people.find(p => p.id === parseInt(req.params.id));

    if (!person) {
        return res.status(404).json({ message: `Person with id ${id} not found` });
    }

    if (!name) {
        return res.status(400).json({ message: 'Please provide a name' });
    }

    person.name = name;
    res.status(200).json({ success: true, data: person });
};

const deletePerson = (req, res) => {
    const id = parseInt(req.params.id);
    const person = people.find(p => p.id === id);
    if (!person) {
        return res.status(404).json({ message: 'Person not found' });
    }

    people = people.filter(p => p.id !== id);
    res.status(200).json({ success: true, message: `Deleted person with id ${id}` });
};

module.exports = {
    getPeople,
    addPerson,
    getPerson,
    updatePerson,
    deletePerson,
};