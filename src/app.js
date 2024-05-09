const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');

// Initialize the app
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
require('./config/passport')(passport);

// Connect to MongoDB
const db = require('./config/keys').mongoURI;
mongoose.connect(db, { useNewUrlParser: true}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.log('Unable to connect to MongoDB ${err}');
});

// Routes
const users = require('./routes/api/users');
const persons = require('./routes/api/persons');
app.use('/api/users', users);
app.use('/api/persons', persons);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server running on port 3000');
});