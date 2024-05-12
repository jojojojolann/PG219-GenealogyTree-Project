const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    birthdate: { type: String },
    deathdate: { type: String },
    id: { type: String },
    father: {
        firstname: { type: String },
        lastname: { type: String },
        birthdate: { type: String },
        deathdate: { type: String },
        id: { type: String }
    },
    mother: {
        firstname: { type: String },
        lastname: { type: String },
        birthdate: { type: String },
        deathdate: { type: String },
        id: { type: String }
    },
    spouse: {
        firstname: { type: String },
        lastname: { type: String },
        birthdate: { type: String },
        deathdate: { type: String },
        id: { type: String }
    },
    children: [{
        firstname: { type: String },
        lastname: { type: String },
        birthdate: { type: String },
        deathdate: { type: String },
        id: { type: String }
    }]
});

module.exports = mongoose.model('Person', personSchema);