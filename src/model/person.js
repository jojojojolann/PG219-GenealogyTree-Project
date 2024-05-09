const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    lastname: { type: String },
    firstname: { type: String },
    gender: { type: String },
    birthdate: { type: String },
    deathdate: { type: String },
    father: {
        id: { type: String, unique: true },
        lastname: { type: String },
        firstname: { type: String },
        gender: { type: String },
        birthdate: { type: String },
        deathdate: { type: String },
    },
    mother: {
        id: { type: String, unique: true },
        lastname: { type: String },
        firstname: { type: String },
        gender: { type: String },
        birthdate: { type: String },
        deathdate: { type: String },
    },
    spouse: {
        id: { type: String, unique: true },
        lastname: { type: String },
        firstname: { type: String },
        gender: { type: String },
        birthdate: { type: String },
        deathdate: { type: String },
    },
    children: [{
        id: { type: String, unique: true },
        lastname: { type: String },
        firstname: { type: String },
        gender: { type: String },
        birthdate: { type: String },
        deathdate: { type: String },
    }]
});

module.exports = mongoose.model('Person', personSchema);