const jwt = require('jsonwebtoken');
import { User } from '@models/user.js';

// eslint-disable-next-line no-unused-vars
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.cookies['token'];
    if (!token) {
      return { status: 403, message: 'No token provided!' };
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return { status: 403, message: 'Unauthorized!' };
      }
      const user = await User.findOne({ _id: decoded._id });
      if (user === undefined) {
        return { status: 403, message: 'UserId is not found' };
      }

      if (Date.now() >= decoded.exp * 1000) {
        return { status: 403, message: 'token is expired' };
      }
    });
    return { status: 200, message: 'Success' };
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};
// eslint-disable-next-line no-unused-vars
export const isSecuredPath = (req, res, next) => {
  let securedPaths = ['/list.json'];
  return securedPaths.includes(req.url.split('?')[0]);

};
