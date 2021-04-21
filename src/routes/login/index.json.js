import { connectToDB, disconnectToDB } from '../../db/_mongo';
import { User } from '../../models/user';

const contentType = { 'Content-Type': 'application/json' };

export async function post(req, res) {
  try {
    const user = req.body;
    await connectToDB();
    const userToLog = await User.findUser(user);
    const token = await userToLog.generateAuthToken();
    const data = [userToLog, token];
    await disconnectToDB();
    res.end(JSON.stringify(data));
  } catch (error) {
    res.writeHead(500, contentType);
    res.end(JSON.stringify({ error: error }));
  }
}
