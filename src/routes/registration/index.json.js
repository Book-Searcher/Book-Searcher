import { connectToDB, disconnectToDB } from '@db/_mongo.js';
import { User } from '@models/user.js';

const contentType = { 'Content-Type': 'application/json' };

export async function post(req, res) {
  try {
    const user = req.body;
    await connectToDB();
    const isUserExist = await User.findOne({ email: user.email });
    if (isUserExist) {
      throw new Error('User is already exists');
    } else {
      const userToAdd = new User(user);
      await userToAdd.save();
      const token = await userToAdd.generateAuthToken();
      const data = [userToAdd, token];
      await disconnectToDB();
      res.end(JSON.stringify(data));
    }
  } catch (error) {
    await disconnectToDB();
    res.writeHead(400, contentType);
    res.end(JSON.stringify({ error: error.message }));
  }
}
