const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../database/model/user');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const valid = await bcrypt.compareSync(password, user.password);
    if (valid) {
      return res.status(200).json({ ...user._doc, password: null });
    }
  }
  return res.status(401).json('unauthorized');
});

module.exports = router;