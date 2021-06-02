const fetch = require('node-fetch');
const dotenv = require('dotenv');
const send = require('@polka/send-type');
dotenv.config();

export async function post(req, res) {
  let url = `https://www.googleapis.com/books/v1/volumes?q=${req.body.text}&maxResults=40&key=${process.env.BOOKS_API_KEY}`;
  fetch(encodeURI(url))
    .then((response) => response.json())
    .then((result) => {
      send(res, 200, result.items);
    })
    .catch((error) => {
      send(res, 400, { error: error.message });
    });
}
