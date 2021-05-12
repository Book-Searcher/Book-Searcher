import { User } from '@models/user.js';

const contentType = { 'Content-Type': 'application/json' };

export async function post(req, res) {
  try {
    const user = req.body;
    const userToLog = await User.findUser(user);
    const token = await userToLog.generateAuthToken();
    const data = {
      id: userToLog._id,
      email: userToLog.email,
      accessToken: token,
    };
    res.setHeader(
      'Set-Cookie',
      [`token = ${token};`, `userId=${userToLog._id}`],
      {
        maxAge: 900000,
        httpOnly: true,
      }
    );
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
