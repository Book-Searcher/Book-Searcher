import { User } from '@models/user.js';
const jwt = require('jsonwebtoken');
const send = require('@polka/send-type');

export async function post(req, res) {
  try {
    const user = req.body;
    const userToLog = await User.checkCredentials(user);
    const token = generateAuthToken(userToLog);
    const data = {
      accessToken: token,
    };
    res.setHeader('Set-Cookie', [`token = ${token}`], {
      maxAge: 86400, // 24 hours
      httpOnly: true,
    });
    send(res, 200, data);
  } catch (error) {
    if (error instanceof Error) {
      return send(res, 400, { error: error.message });
    }
    send(res, 500, { error: error.message });
  }
}
export const generateAuthToken = (user) =>
  jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
