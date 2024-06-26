const express = require('express');
const router = express.Router();
const Person = require('../../model/person');
const { v4: uuidv4 } = require('uuid');

/**
 * @route POST api/persons/create
 * @desc Create a person
 * @access Public
 */
router.post('/create', async (req, res) => {
    try {
        const { firstname, lastname, birthdate, deathdate } = req.body;
        const id = uuidv4();
        const newPerson = new Person({
            firstname,
            lastname,
            birthdate,
            deathdate,
            id: id,
            father: null,
            mother: null,
            spouse: null,
            children: []
        });
        await newPerson.save();
        res.status(200).json({ msg: 'Person is created', id: newPerson.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

/**
 * @route GET api/persons/list
 * @desc Get all persons
 * @access Public
 */
router.get('/list', async (req, res) => {
    try {
        const persons = await Person.find({});
        res.status(200).json({ persons });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

/**
 * @route GET api/persons/:id
 * @desc Get a person
 * @access Public
 */
router.get('/:id', async (req, res) => {
    try {
        const person = await Person.findOne({ id: req.params.id });
        if (!person) {
            return res.status(404).json({ msg: 'Person not found 1' });
        } else {
            res.status(200).json({ person });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

/**
 * @route DELETE api/persons/delete/:id
 * @desc Delete a person
 * @access Public
 */
router.delete('/delete/:id', async (req, res) => {
    try {
        const person = await Person.findOneAndDelete({ id: req.params.id });
        if (!person) {
            return res.status(404).json({ msg: 'Person not found 2' });
        } else {
            res.status(200).json({ msg: 'Person is deleted' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

/**
 * @route PUT api/persons/edit/:id
 * @desc Edit a person's parents
 */
router.put('/edit/:id', async (req, res) => {
    try {
        let father = req.body.father;
        let mother = req.body.mother;
        let spouse = req.body.spouse;
        let children = req.body.children;

        const person = await Person.findOneAndUpdate({ id: req.params.id }, {
            father: father,
            mother: mother,
            spouse: spouse,
            children: children
        });

        if (!person) {
            return res.status(404).json({ msg: 'Person not found 3' });
        } else {
            res.status(200).json({ msg: 'Person is updated' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

/**
 * @route GET api/persons/children/:id
 * @desc Get all children of a person
 * @access Public
 */
router.get('/children/:id', async (req, res) => {
    try {
        const person = await Person.findOne({ id: req.params.id });
        if (!person) {
            return res.status(404).json({ msg: 'Person not found 4' });
        } else {
            res.status(200).json({ children: person.children });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

/**
 * @route GET api/persons/parents/:id
 * @desc Get parents of a person
 * @access Public
 */
router.get('/parents/:id', async (req, res) => {
    try {
        const person = await Person.findOne({ id: req.params.id });
        if (!person) {
            return res.status(404).json({ msg: 'Person not found 5' });
        } else {
            res.status(200).json({ father: person.father, mother: person.mother });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

/**
 * @route GET api/persons/spouse/:id
 * @desc Get spouse of a person
 * @access Public
 */
router.get('/spouse/:id', async (req, res) => {
    try {
        const person = await Person.findOne({ id: req.params.id });
        if (!person) {
            return res.status(404).json({ msg: 'Person not found 6' });
        } else {
            res.status(200).json({ spouse: person.spouse });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;