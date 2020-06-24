const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send("get a user");
});

router.post('/', (req, res) => {
  res.status(201).send("create a user");
});

router.put('/', (req, res) => {
  res.status(200).send("update a user");
});

router.delete('/', (req, res) => {
  res.status(204).send("remove a user");
});

module.exports = router;