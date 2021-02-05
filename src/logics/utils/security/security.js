const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const crypto = require('crypto');
require('dotenv').config();

const generateHash = (data) => {
  return crypto.createHmac('sha256', process.env.SECRET).update(data).digest('hex');
};

const sign = (id) => {
  const token = jwt.sign({ id }, process.env.SECRET, {
    expiresIn: `${process.env.TIME_ACCESS_TOKEN}m`
  });
  return token;
}

const generateTokenRefresh = () => {
  return randtoken.uid(256);
}

const generateTokenResetPassword = ({ id, time }) => {
  const token = jwt.sign({ id, time }, process.env.SECRET);
  return token;
}

const verifyTokenResetPassword = (token) => {
  const response = jwt.verify(token, process.env.SECRET);
  return response;
}

const verifyJWT = (token) => {
  if (!token) return false;
  return jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) return false;
    return decoded.id;
  });
}


export {
  sign,
  verifyJWT,
  generateTokenRefresh,
  generateHash,
  generateTokenResetPassword,
  verifyTokenResetPassword
}