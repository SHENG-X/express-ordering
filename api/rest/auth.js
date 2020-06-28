const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../database/model/user');
const { translateUser } = require('../../util/helper'); 

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const valid = await bcrypt.compareSync(password, user.password);
    if (valid) {
      const token = jwt.sign(translateUser(user), process.env.JWT_SECRET, { expiresIn: '6h' });
      return res.status(200).json(token);
    }
  }
  return res.status(401).json('unauthorized');
});

module.exports = router;