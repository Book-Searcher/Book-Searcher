import { fireEvent, render } from '@testing-library/svelte';
import BookItem from '@components/BookItem.svelte';
import { List } from '@models/list.js';
import bookData from '../mockData/mockData';

const listResponse = new List(bookData.listResponse);
global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => Promise.resolve(JSON.stringify(listResponse)),
  });
});
global.window = Object.create(window);

describe('Book Item Button Testing', () => {
  const bookInfo = bookData.bookInfo;
  const headers = { 'Content-Type': 'application/json' };
  describe('Add Button', () => {
    let book = bookData.allBooks[0];
    let getByText;
    beforeEach(() => {
      ({ getByText } = render(BookItem, {
        props: {
          book: book,
          showDelBut: true,
        },
      }));
    });
    test('Add Button Test for FavList', () => {
      fireEvent.click(getByText('FavList'));
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('list.json?type=favList', {
        method: 'POST',
        headers,
        body: JSON.stringify(bookInfo),
      });
    });
    test('Add Button Test for WantToReadList', () => {
      fireEvent.click(getByText('WantToReadList'));
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith('list.json?type=wantToReadList', {
        method: 'POST',
        headers,
        body: JSON.stringify(bookInfo),
      });
    });
    test('Add Button Test for ReadList', () => {
      fireEvent.click(getByText('ReadList'));
      expect(fetch).toHaveBeenCalledTimes(3);
      expect(fetch).toHaveBeenCalledWith('list.json?type=readList', {
        method: 'POST',
        headers,
        body: JSON.stringify(bookInfo),
      });
    });
  });
});
