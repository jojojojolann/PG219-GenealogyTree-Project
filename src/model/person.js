const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    birthdate: { type: String },
    deathdate: { type: String },
    id: { type: String },
    father: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
     },
    mother: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
     },
    children: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
     }],
    spouse: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
     }
});

module.exports = mongoose.model('Person', personSchema);