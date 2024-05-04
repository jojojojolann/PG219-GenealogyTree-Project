const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        default : 'user',
        enum : ['user', 'admin']
    },
    date : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('User', userSchema);