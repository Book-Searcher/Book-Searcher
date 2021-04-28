import { connectToDB, disconnectToDB } from '../../db/_mongo';
import { FavList } from '../../models/favList';
import { Book } from '../../models/book';

const contentType = { 'Content-Type': 'application/json' };

export async function get(req, res) {
  try {
    await connectToDB();
    let books = [];
    const favList = await FavList.findOne({
      owner: '6080aa0b03cde855141b955d',
    });
    for (let item in favList.books) {
      const book = await Book.findOne({ _id: favList.books[item].book });
      books.push(book);
    }
    await disconnectToDB();
    res.writeHead(200, contentType);
    res.end(JSON.stringify(books));
  } catch (error) {
    res.writeHead(500, contentType);
    res.end(JSON.stringify({ error: error }));
  }
}

export async function post(req, res) {
  try {
    await connectToDB();
    let book = await Book.findOne({ title: req.body.title });
    if (!book) {
      book = new Book({
        title: req.body.title,
        // authors: req.body.authors,
        publishedDate: req.body.publishedDate,
        description: req.body.description,
        // categories: req.body.categories,
        language: req.body.language,
        pageCount: req.body.pageCount,
        img: req.body.img,
        link: req.body.link,
      });
    }

    await book.save();

    let favList = await FavList.findOne({ owner: req.body.owner });
    if (!favList) {
      favList = new FavList({
        owner: req.body.owner,
      });
    } else if (checkBook(favList, book)) {
      throw new Error('The book already exists');
    }
    favList.books = favList.books.concat({ book: book._id });

    await favList.save();
    await disconnectToDB();

    res.end(JSON.stringify(favList));
  } catch (error) {
    await disconnectToDB();
    if (error instanceof Error) {
      res.writeHead(404, contentType);
      res.end(JSON.stringify({ error: error.message }));
    } else {
      res.writeHead(500, contentType);
      res.end(JSON.stringify({ error: error }));
    }
  }
}
async function checkBook(favList, book) {
  let duplicate = false;
  favList.books.forEach(async (bookItem) => {
    let foundedBook = await Book.findOne({ _id: bookItem._id });
    if (foundedBook && foundedBook._id === book._id) duplicate = true;
  });
  return duplicate;
}
