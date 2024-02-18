const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      let decodedData;
      if (token) {
        decodedData = jwt.decode(token);
        req.userId = decodedData.sub;
      }
      next();
    } else {
      res.status(500).json({ message: 'Could not find token', status: 500 });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
