const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const customers = require('./routes/customers');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();
const cors = require('cors');

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

app.use(cors());

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/customers', customers);
app.use('/api/users', users);
app.use('/api/auth', auth);

// if (!server) {
//   server = http.createServer(app);
// }
//
// app.use(bodyParser.json({limit: '10mb', extended: true}))
// app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

