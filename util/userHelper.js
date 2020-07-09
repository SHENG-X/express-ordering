const jwt = require('jsonwebtoken');

const translateUserResponse = (user) => {
  const token = signUser(user);
  return {
    user: {
      admin: user.admin,
      fname: user.fname,
      lname: user.lname,
    },
    token
  };
}

const signUser = (user) => {
  return jwt.sign({ id: user.id, admin: user.admin }, process.env.JWT_SECRET, { expiresIn: '6h' })
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
  translateUserResponse,
  signUser,
  verifyUser,
}