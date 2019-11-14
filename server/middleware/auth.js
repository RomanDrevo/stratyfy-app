const bcrypt = require('bcrypt');
const { User } = require('../models/user');


module.exports = async function (req, res, next) {
  try {
    const user = await User.findOne(req.user._id).select('-password');

    // const token = req.header('x-auth-token');
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) return res.status(400).send('Invalid email or password');
    next();
  } catch (ex) {
    res.status(400).send('Invalid password.');
  }
};
