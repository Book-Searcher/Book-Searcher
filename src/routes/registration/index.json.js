import { User } from '@models/user.js';

const contentType = { 'Content-Type': 'application/json' };

export async function post(req, res) {
  try {
    const user = req.body;
    const isUserExist = await User.findOne({ email: user.email });
    if (isUserExist) {
      throw new Error('User is already exists');
    } else {
      const userToAdd = new User(user);
      await userToAdd.save();
      const data = [userToAdd];
      res.end(JSON.stringify(data));
    }
  } catch (error) {
    res.writeHead(400, contentType);
    res.end(JSON.stringify({ error: error.message }));
  }
}
