const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../../database/model/user');

const saltRounds = 10;

router.get('/', async (req, res) => {
  const email = req.query.email;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json('email was registered in the system');
  }
  res.status(200).json('email was not registered in the system');
});

router.post('/', async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json('email was registered in the system');
  } else {
    const encryptedPassword = await bcrypt.hashSync(req.body.password, saltRounds);
    const user = new User({ ...req.body, password: encryptedPassword });
    await user.save((err, doc) => {
      if (err) {
        res.status(500).json(err);
      }
      res.status(201).json({...doc._doc, password: null});
    });
  }
});

router.put('/', (req, res) => {
  res.status(200).send("update a user");
});

router.delete('/', (req, res) => {
  res.status(204).send("remove a user");
});

module.exports = router;