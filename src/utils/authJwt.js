const jwt = require('jsonwebtoken');
import { User } from '@models/user.js';

// eslint-disable-next-line no-unused-vars
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.cookies['token'];
    if (!token) {
      return { status: 403, message: 'No token provided!' };
    }

    return jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return { status: 403, message: err };
      }
      const user = await User.findOne({ _id: decoded._id });
      if (user === undefined) {
        return { status: 403, message: 'UserId is not found' };
      }
      return { status: 200, message: 'Success', uid: decoded._id };
    });
  } catch (err) {
    throw new Error(err.message);
  }
};
// eslint-disable-next-line no-unused-vars
export const isSecuredPath = (req, res, next) => {
  let securedPaths = ['/list.json'];
  return securedPaths.includes(req.url.split('?')[0]);
};
