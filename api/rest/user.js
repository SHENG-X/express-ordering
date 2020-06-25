const express = require('express');
const router = express.Router();

const logger = require('../../util/helper');
const User = require('../../database/model/user');
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