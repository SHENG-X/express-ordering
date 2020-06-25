const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.status(200).send("authenticate a user");
});

module.exports = router;