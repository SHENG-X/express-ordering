const express = require('express');
const { body } = require('express-validator');

const userService = require('../../services/userService');

const router = express.Router();

router.get('/', [], userService.exist);

router.post('/', [body('email').isEmail()], userService.signUp);

router.post('/sign-in', [body('email').isEmail()], userService.signIn);

router.put('/', (req, res) => {
  res.status(200).send("update a user");
});

router.delete('/', (req, res) => {
  res.status(204).send("remove a user");
});

module.exports = router;