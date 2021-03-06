import { List } from '@models/list.js';
import { Book } from '@models/book.js';
const send = require('@polka/send-type');

export async function get(req, res) {
  try {
    const list = await List.findOne({
      owner: req.auth.uid,
      type: req.query.type,
    });
    if (!list) return send(res, 200, []);
    let booksId = [];
    list.books.forEach((book) => booksId.push(book.book));
    let books = await Book.find({ _id: { $in: booksId } });
    send(res, 200, books);
  } catch (error) {
    if (error instanceof Error) {
      return send(res, 400, { error: error.message });
    }
    send(res, 500, { error: error.message });
  }
}

export async function post(req, res) {
  try {
    let book = await Book.findOne({ title: req.body.title });
    if (!book) {
      book = new Book({
        title: req.body.title,
        authors: req.body.authors,
        publishedDate: req.body.publishedDate,
        description: req.body.description,
        categories: req.body.categories,
        language: req.body.language,
        pageCount: req.body.pageCount,
        img: req.body.img,
        link: req.body.link,
        buyLink: req.body.buyLink,
        amount: req.body.amount,
        currencyCode: req.body.currencyCode,
      });
      await book.save();
    }
    let list = await List.findOne({
      owner: req.auth.uid,
      type: req.query.type,
    });
    if (!list) {
      list = new List({
        owner: req.auth.uid,
        type: req.query.type,
      });
    } else if (checkBook(list, book)) {
      throw new Error('The book already exists');
    }
    list.books = list.books.concat({ book: book._id });
    await list.save();
    send(res, 200, list);
  } catch (error) {
    if (error instanceof Error) {
      return send(res, 404, { error: error.message });
    }
    send(res, 500, { error: error.message });
  }
}
function checkBook(list, book) {
  let duplicate = false;
  list.books.forEach((bookItem) => {
    if (bookItem.book.equals(book._id)) duplicate = true;
  });
  return duplicate;
}

export async function del(req, res) {
  try {
    const result = await List.updateOne(
      {
        owner: req.auth.uid,
        type: req.query.type,
      },
      {
        $pull: {
          books: { book: req.body._id },
        },
      }
    );
    send(res, 200, result);
  } catch (error) {
    if (error instanceof Error) {
      return send(res, 400, { error: error.message });
    }
    send(res, 500, { error: error.message });
  }
}
