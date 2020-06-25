const express = require('express');
const router = express.Router();

const logger = require('../../util/helper');
const User = require('../../database/model/user');

router.get('/', async (req, res) => {
  const email = req.query.email;
  const user = await User.find({email: email});
  if(user.length){
    return res.status(409).json('email was registered in the system');
  }
  res.status(200).json('email was not registered in the system');
});

router.post('/', async (req, res) => {
  const user = new User({ ...req.body });
  await user.save((err, doc) => {
    if (err) {
      logger.error(err);
      res.status(500).json(err);
    }
    res.status(201).json(doc._doc);
  });
});

router.put('/', (req, res) => {
  res.status(200).send("update a user");
});

router.delete('/', (req, res) => {
  res.status(204).send("remove a user");
});

module.exports = router;