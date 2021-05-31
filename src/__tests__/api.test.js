import bookData from '../mockData/mockData';
import polka from 'polka';
import * as sapper from '@sapper/server';
import { List } from '@models/list.js';
import { Book } from '@models/book.js';
const { json } = require('body-parser');
const request = require('supertest');

let { handler } = polka().use(
  json(),
  (req, res, next) => {
    req.auth = { uid: 'test6' };
    next();
  },
  sapper.middleware({})
);

describe('List module api testing', () => {
  const bookFindDistinctResult = bookData.bookFindDistinctResult;
  const bookFindOneResult = bookData.bookFindOneResult;
  const listFindDistinctResult = new List(bookData.listFindDistinctResult);
  jest.setTimeout(30000);
  beforeEach(() => {
    const ListFindMock = jest.spyOn(List, 'findOne');
    const ListFindDistinct = jest.fn(() => listFindDistinctResult);
    ListFindMock.mockImplementation(ListFindDistinct);

    const ListUpdateMock = jest.spyOn(List, 'updateOne');
    const ListUpdateDistinct = jest.fn(() => listFindDistinctResult);
    ListUpdateMock.mockImplementation(ListUpdateDistinct);

    jest
      .spyOn(List.prototype, 'save')
      .mockImplementation(() => Promise.resolve('successful update'));

    const BookFindOneMock = jest.spyOn(Book, 'findOne');
    const BookFindDistinct = jest.fn(() => bookFindOneResult);
    BookFindOneMock.mockImplementation(BookFindDistinct);

    const BookFindMock = jest.spyOn(Book, 'find');
    const BookFindResult = jest.fn(() => bookFindDistinctResult);
    BookFindMock.mockImplementation(BookFindResult);
    jest
      .spyOn(Book.prototype, 'save')
      .mockImplementation(() => Promise.resolve('successful update'));
  });
  test('Get book api testing', async () => {
    const response = await request(handler).get('/list.json?type=favList');
    expect(response.text).toBeDefined();
    expect(response.text).not.toBeNull();
    expect(response.text).toMatch(JSON.stringify(bookFindDistinctResult));
  });

  test('Post book api testing', async () => {
    let body = bookData.allBooks[0].volumeInfo;
    const response = await request(handler)
      .post('/list.json?type=favList')
      .set('Content-Type', 'application/json')
      .send(body);
    expect(response.text).toBeDefined();
    expect(response.text).not.toBeNull();
    expect(response.text).toMatch(JSON.stringify(listFindDistinctResult));
  });

  test('Del book api testing', async () => {
    const response = await request(handler)
      .del('/list.json?type=favList')
      .expect(200);
    expect(response.text).toBeDefined();
    expect(response.text).not.toBeNull();
    expect(response.text).toMatch(JSON.stringify(listFindDistinctResult));
  });
});
