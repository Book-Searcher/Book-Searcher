const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

export async function post(req, res) {
  let url = `https://www.googleapis.com/books/v1/volumes?q=${req.body.text}&maxResults=40&key=${process.env.BOOKS_API_KEY}`;
  fetch(encodeURI(url))
    .then((response) => response.json())
    .then((result) => {
      res.end(JSON.stringify(result.items));
    })
    .catch((error) => {
      res.writeHead(400);
      res.end(JSON.stringify({ error: error.message }));
    });
}
