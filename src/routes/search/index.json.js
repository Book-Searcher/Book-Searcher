import { connectToDB, disconnectToDB } from '../../db/_mongo';
import { User } from '../../models/user';

const contentType = { 'Content-Type': 'application/json' };

export async function get(req, res) {
  await connectToDB();
  User.find({}, async function (err, users) {
    await disconnectToDB();
    try {
      res.writeHead(200, contentType);
      res.end(JSON.stringify(users));
    } catch (error) {
      res.writeHead(500, contentType);
      res.end(JSON.stringify({ error: error }));
    }
  });
}

export async function post(req, res) {
  try {
    const user = req.body;
    await connectToDB();
    const userToAdd = new User(user);
    const result = await userToAdd.save();
    await disconnectToDB();
    res.end(JSON.stringify(result));
  } catch (error) {
    res.writeHead(500, contentType);
    res.end(JSON.stringify({ error: error }));
  }
}
