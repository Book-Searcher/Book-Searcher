import { User } from '@models/user.js';
const send = require('@polka/send-type');

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
      send(res, 200, data);
    }
  } catch (error) {
    if (error instanceof Error) {
      return send(res, 400, { error: error.message });
    }
    send(res, 500, { error: error.message });
  }
}
