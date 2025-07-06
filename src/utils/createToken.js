const jwt = require('jsonwebtoken');

const createToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  return token;
};

module.exports =  createToken;