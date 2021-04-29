import { connectToDB, disconnectToDB } from '../../db/_mongo';
import { User } from '../../models/user';

const contentType = { 'Content-Type': 'application/json' };

export async function post(req, res) {
  try {
    const user = req.body;
    await connectToDB();
    const userToLog = await User.findUser(user);
    const token = await userToLog.generateAuthToken();
    const data = {
      id: userToLog._id,
      email: userToLog.email,
      accessToken: token,
    };
    await disconnectToDB();
    req.session.token = data.accessToken;
    req.session.userId = data.id;
    res.writeHead(200).end(JSON.stringify(data));
  } catch (error) {
    await disconnectToDB();
    if (error instanceof Error) {
      res.writeHead(400, contentType);
      res.end(JSON.stringify({ error: error.message }));
    } else {
      res.writeHead(500, contentType);
      res.end(JSON.stringify({ error: error }));
    }
  }
}
