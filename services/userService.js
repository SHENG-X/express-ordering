const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const userModel = require('../database/model/userModel');

const { verifyUser, translateUserResponse } = require('../util/userHelper');

const saltRounds = 10;

const exist = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const [{ msg }] = error.errors;
    res.status(400).json(msg);
  } else {
    const email = req.query.email;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json('email was registered in the system');
    }
    res.status(200).json('email was not registered in the system');
  }
}

const signIn = async (req, res) => {
  const authToken = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  if (authToken) {
    const decoded = await verifyUser(authToken);
    if (decoded) {
      const user = await userModel.findById(decoded.id);
      return res.status(200).json(translateUserResponse(user));
    } else {
      return res.status(401).json('unauthorized');
    }
  }
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const [{ msg }] = error.errors;
    res.status(400).json(msg);
  } else {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const valid = await bcrypt.compareSync(password, user.password);
      if (valid) {
        return res.status(200).json(translateUserResponse(user));
      }
    }
    return res.status(401).json('unauthorized');
  }
}

const signUp = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const [{ msg }] = error.errors;
    res.status(400).json(msg);
  } else {
    const email = req.body.email;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json('email was registered in the system');
    } else {
      const encryptedPassword = await bcrypt.hashSync(req.body.password, saltRounds);
      const user = new userModel({ ...req.body, password: encryptedPassword });
      await user.save((error, doc) => {
        if (error) {
          res.status(500).json(error);
        } else {
          res.status(201).json(translateUserResponse(user));
        }
      });
    }
  }
}

module.exports = {
  exist,
  signIn,
  signUp,
}
