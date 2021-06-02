import { fireEvent, render } from '@testing-library/svelte';
import BookContainer from '@components/BookContainer.svelte';
import View from '@components/View.svelte';
import BookItem from '@components/BookItem.svelte';
import bookData from '../mockData/mockData';
import List from '../routes/list/index.svelte';

describe('List module rendering testing', () => {
  let book = bookData.allBooks[0];
  test('should display View window with all data', () => {
    let book = bookData.allBooks[0];
    const { getByText, container } = render(View, {
      props: {
        wholeinfo: book,
        shown: true,
      },
    });
    expect(getByText(`"${book.volumeInfo.title}"`)).toBeInTheDocument();
    expect(getByText(book.volumeInfo.authors)).toBeInTheDocument();
    expect(getByText(book.volumeInfo.publishedDate)).toBeInTheDocument();
    expect(getByText(`"${book.volumeInfo.categories}"`)).toBeInTheDocument();
    expect(getByText(`"${book.volumeInfo.language}"`)).toBeInTheDocument();
    expect(getByText(book.volumeInfo.pageCount)).toBeInTheDocument();
    expect(container.getElementsByTagName('img')[0].src).toBe(
      `${book.volumeInfo.imageLinks.thumbnail}`
    );
    expect(container.querySelector('a').href).toBe(`${book.saleInfo.buyLink}`);
    expect(
      getByText(
        book.saleInfo.listPrice.amount +
          ' ' +
          book.saleInfo.listPrice.currencyCode
      )
    ).toBeInTheDocument();
  });
  test('should estimate personally reading progress', async () => {
    const { getByTestId, getByText } = render(View, {
      props: {
        wholeinfo: book,
        shown: true,
      },
    });
    let input = getByTestId('estimation');
    let days = 2;
    let result = book.volumeInfo.pageCount
      ? (book.volumeInfo.pageCount / days).toFixed(1)
      : 'There is no info about page count';
    fireEvent.input(input, { target: { value: days } });
    await fireEvent.click(getByText('estimate'));
    expect(getByText(`= ${result}`)).toBeInTheDocument();
  });
  test('should display Book Item', () => {
    const { getByText, container } = render(BookItem, {
      props: {
        book: book,
        showDelBut: true,
      },
    });
    expect(getByText(book.volumeInfo.title)).toBeInTheDocument();
    expect(getByText(book.volumeInfo.authors)).toBeInTheDocument();
    expect(container.getElementsByTagName('img')[0].src).toBe(
      `${book.volumeInfo.imageLinks.thumbnail}`
    );
    expect(getByText('View')).toBeInTheDocument();
    expect(getByText('WantToReadList')).toBeInTheDocument();
    expect(getByText('ReadList')).toBeInTheDocument();
    expect(getByText('FavList')).toBeInTheDocument();
    expect(getByText('Delete')).toBeInTheDocument();
  });
  test('should display Book Container', () => {
    const { container } = render(BookContainer, {
      props: {
        allBooks: bookData.allBooks,
        showDelBut: true,
      },
    });
    expect(container.getElementsByClassName('book-item')).toHaveLength(
      bookData.allBooks.length
    );
  });
  test('should display List', () => {
    const { container } = render(List, {
      props: {
        listBooks: bookData.allBooks,
      },
    });
    expect(container.getElementsByClassName('book-container')).toHaveLength(1);
  });
  test('should display empty List', () => {
    const { getByText } = render(List, {
      props: {
        listBooks: [],
      },
    });
    expect(getByText('Try to find a fabulous book💡')).toBeInTheDocument();
  });
});
