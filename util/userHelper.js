const jwt = require('jsonwebtoken');

const signUser = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '6h' })
}

const verifyUser = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return false;
  }
}

module.exports = {
  signUser,
  verifyUser,
}