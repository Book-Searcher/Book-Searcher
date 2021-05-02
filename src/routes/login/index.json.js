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
    req.session.token = data.accessToken;
    req.session.userId = data.id;
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
