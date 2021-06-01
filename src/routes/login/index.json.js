import { User } from '@models/user.js';
const jwt = require('jsonwebtoken');

const contentType = { 'Content-Type': 'application/json' };

export async function post(req, res) {
  try {
    const user = req.body;
    const userToLog = await User.checkCredentials(user);
    const token = generateAuthToken(userToLog);
    const data = {
      accessToken: token,
    };
    res.setHeader('Set-Cookie', [`token = ${token}`], {
      maxAge: 900000,
      httpOnly: true,
    });
    //todo: you know...
    res.writeHead(200).end(JSON.stringify(data));
  } catch (error) {
    if (error instanceof Error) {
      res.writeHead(400, contentType);
      res.end(JSON.stringify({ error: error.message }));
    } else {
      res.writeHead(500, contentType);
      res.end(JSON.stringify({ error: error }));
    }
  }
}
const generateAuthToken = (user) =>
  jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
