const express = require('express');
const router = express.Router();
const {
    addPerson,
    getPeople,
    getPerson,
    updatePerson,
    deletePerson,
} = require('../controllers/people.js');

router.get('/', getPeople);
router.post('/', addPerson);
router.get('/:id', getPerson);
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);

module.exports = router;