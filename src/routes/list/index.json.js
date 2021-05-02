import { List } from '@models/list.js';
import { Book } from '@models/book.js';

export async function get(req, res) {
  try {
    let books = [];
    const list = await List.findOne({
      owner: req.session.userId,
      type: req.query.type,
    });
    if (!list) {
      throw new Error('List is empty😥');
    } else {
      for (let item in list.books) {
        const book = await Book.findOne({ _id: list.books[item].book });
        books.push(book);
      }
      res.writeHead(200).end(JSON.stringify(books));
    }
  } catch (error) {
    if (error instanceof Error) {
      res.writeHead(400).end(JSON.stringify({ error: error.message }));
    } else {
      res.writeHead(500).end(JSON.stringify({ error: error.message }));
    }
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
    }
    await book.save();
    let list = await List.findOne({
      owner: req.body.owner,
      type: req.query.type,
    });
    if (!list) {
      list = new List({
        owner: req.body.owner,
        type: req.query.type,
      });
    } else if (await checkBook(list, book)) {
      throw new Error('The book already exists');
    }
    list.books = list.books.concat({ book: book._id });

    await list.save();
    res.end(JSON.stringify(list));
  } catch (error) {
    if (error instanceof Error) {
      res.writeHead(404).end(JSON.stringify({ error: error.message }));
    } else {
      res.writeHead(500).end(JSON.stringify({ error: error }));
    }
  }
}
async function checkBook(list, book) {
  let duplicate = false;
  list.books.forEach(async (bookItem) => {
    if (String(bookItem.book) == String(book._id)) duplicate = true;
  });
  return duplicate;
}

export async function del(req, res) {
  try {
    const result = await List.updateOne(
      {
        owner: req.body.owner,
        type: req.query.type,
      },
      {
        $pull: {
          books: { book: req.body._id },
        },
      }
    );
    res.writeHead(200).end(JSON.stringify(result));
  } catch (error) {
    if (error instanceof Error) {
      res.writeHead(400).end(JSON.stringify({ error: error.message }));
    } else {
      res.writeHead(500).end(JSON.stringify({ error: error.message }));
    }
  }
}
