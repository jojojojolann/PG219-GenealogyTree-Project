const express = require('express');
const router = express.Router();
const Person = require('../../model/person');
const { v4: uuidv4 } = require('uuid');

/**
 * @route POST api/person/create
 * @desc Create a person
 * @access Public
 */
router.post('/create', async (req, res) => {
    try {
        const person = new Person({
            id: uuidv4(),
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            gender: req.body.gender,
            birthdate: req.body.birthdate,
            deathdate: req.body.deathdate,
            father: {
                id: uuidv4(),
                lastname: req.body.father.lastname,
                firstname: req.body.father.firstname,
                gender: "M",
                birthdate: req.body.father.birthdate,
                deathdate: req.body.father.deathdate,
            },
            mother: {
                id: uuidv4(),
                lastname: req.body.mother.lastname,
                firstname: req.body.mother.firstname,
                gender: "F",
                birthdate: req.body.mother.birthdate,
                deathdate: req.body.mother.deathdate,
            },
            spouse: {
                id: uuidv4(),
                lastname: req.body.spouse.lastname,
                firstname: req.body.spouse.firstname,
                gender: req.body.spouse.gender,
                birthdate: req.body.spouse.birthdate,
                deathdate: req.body.spouse.deathdate,
            },
            children: req.body.children.map(child => {
                return {
                    id: uuidv4(),
                    lastname: child.lastname,
                    firstname: child.firstname,
                    gender: child.gender,
                    birthdate: child.birthdate,
                    deathdate: child.deathdate,
                }
            })   
        })
        await person.save();
        res.status(201).json({ msg: 'Person is now registered', id: person.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

/**
 * @route GET api/person/:id
 * @desc Get a person
 * @access Public
 */
router.get('/:id', async (req, res) => {
    try {
        const person = await Person.findOne({ id: req.params.id });
        if (!person) {
            return res.status(404).json({ msg: 'Person not found' });
        } else {
            res.status(200).json({ person });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

/**
 * @route DELETE api/person/delete/:id
 * @desc Delete a person
 * @access Public
 */
router.delete('/delete/:id', async (req, res) => {
    try {
        const person = await Person.findOneAndDelete({ id: req.params.id });
        if (!person) {
            return res.status(404).json({ msg: 'Person not found' });
        } else {
            res.status(200).json({ msg: 'Person is deleted' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

/**
 * @route PUT api/person/edit/:id
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
            return res.status(404).json({ msg: 'Person not found' });
        } else {
            res.status(200).json({ msg: 'Person is updated' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;