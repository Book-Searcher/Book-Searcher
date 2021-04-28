import { connectToDB, disconnectToDB } from '../../db/_mongo';
import { FavList } from '../../models/favList';
import { Book } from '../../models/book';
import { User } from '../../models/user';

const contentType = { 'Content-Type': 'application/json' };

export async function post(req, res) {
  try {
    await connectToDB();
    const book = new Book({
      title: req.body.title,
    });
    await book.save();

    const user = await User.findOne({ _id: req.body.owner });

    const favlist = new FavList({
      owner: user._id,
      book: book._id,
    });
    await favlist.save();
    await disconnectToDB();
    res.end(JSON.stringify(favlist));
  } catch (error) {
    await disconnectToDB();
    res.writeHead(400, contentType);
    res.end(JSON.stringify({ error: error.message }));
  }
}

//   try {
//     const books = await Book.find({owner: req.body.owner});
//     if( _.find(books, {'link': req.body.link}) !== undefined) {
//       res.status(400).send('Already saved');
//     } else {
//       await book.save();
//     }
//     res.status(201).send();
//   } catch (err) {
//     res.status(400).send(err);
//   }
