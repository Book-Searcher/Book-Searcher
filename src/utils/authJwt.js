const jwt = require('jsonwebtoken');
import { User } from '@models/user.js';
import { connectToDB, disconnectToDB } from '@db/_mongo.js';

export const verifyToken = async (req, res, next) => {
  const securedPaths = ['/favList.json'];
  try {
    if (!securedPaths.includes(req.url)) {
      return next();
    }

    let token = req.headers['x-access-token'];
    if (!token) {
      return res.writeHead(403).end(
        JSON.stringify({
          message: 'No token provided!',
        })
      );
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.writeHead(403).end(
          JSON.stringify({
            message: 'Unauthorized!',
          })
        );
      }
      await connectToDB();
      const user = await User.findOne({ _id: decoded._id });
      await disconnectToDB();
      if (user == undefined) {
        return res.writeHead(403).end(
          JSON.stringify({
            message: 'UserId is not found',
          })
        );
      }

      if (Date.now() >= decoded.exp * 1000) {
        return res.writeHead(403).end(
          JSON.stringify({
            message: 'token is expired',
          })
        );
      }
      next();
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
