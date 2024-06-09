const jwt = require('jsonwebtoken');
const db = require('../models');

module.exports = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).send('Authorization header is missing');
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, 'narsimma');
    const user = await db.User.findByPk(decoded.id);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send(`Please authenticate: ${error.message}`);
  }
};
