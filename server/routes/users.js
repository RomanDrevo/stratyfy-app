const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const mongoose = require('mongoose');
const express = require('express');
const { User, validate } = require('../models/user');
const cors = require('../middleware/cors');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.get('/', admin, async (req, res) => {
  console.log('--req.body: ', req.body);
  // console.log('--cookies: ', res.cookies);
  const users = await User.find();
  res.send(users);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  console.log('--user: ', user);

  await user.save();

  res.send({ user: _.pick(user, ['_id', 'email']), message: `User ${req.body.email} has been created.` });
});


router.post('/delete', async (req, res) => {
  const user = await User.findById(req.body.user._id);

  if (!user) return res.status(400).send('No record with this email.');

  await user.delete();

  res.status(200).send({ message: `User ${req.body.user.email} has been deleted.` });
});

module.exports = router;
