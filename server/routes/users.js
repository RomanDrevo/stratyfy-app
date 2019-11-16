const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const { User, validate } = require('../models/user');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.get('/', admin, async (req, res) => {
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

  await user.save();

  res.send({ user: _.pick(user, ['_id', 'email']), message: `User ${req.body.email} has been created.` });
});


router.post('/delete', async (req, res) => {
  const user = await User.findById(req.body.user._id);

  if (!user) return res.status(400).send('No record with this email.');

  await user.delete();

  res.status(200).send({ userId: user._id, message: `User ${req.body.user.email} has been deleted.` });
});


router.put('/', async (req, res) => {
  const user = await User.findOneAndUpdate(
    { email: req.body.email }, { email: req.body.newEmail }, { useFindAndModify: false, new: true },
  );

  res.status(200).send({ user, message: `User ${user.email} has been edited.` });
});

module.exports = router;
