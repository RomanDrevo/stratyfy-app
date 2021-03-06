const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();
const cors = require('cors');
// const cookieParser = require('cookie-parser');


if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

app.use(cors());

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);


// app.use(cookieParser());

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
