<script context="module">
export async function preload(page, session) {
  try {
    const res = await this.fetch(`list.json?type=${page.query.type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': session.token,
      },
    });
    const books = await res.json();

    let listBooks = [];
    if (books && books.error == 'List is empty😥') {
      listBooks.push({ error: books.error });
    } else {
      books.forEach((book) => {
        listBooks.push({
          _id: book._id,
          volumeInfo: {
            title: book.title,
            authors: [book.authors],
            publishedDate: book.publishedDate,
            description: book.description,
            categories: [book.categories],
            language: book.language,
            pageCount: book.pageCount,
            imageLinks: { thumbnail: book.img },
            link: book.link,
          },
          saleInfo: {
            buyLink: book.buyLink,
            listPrice: {
              amount: book.amount,
              currencyCode: book.currencyCode,
            },
          },
        });
      });
    }
    return { listBooks };
  } catch (e) {
    this.error(500, e.message);
  }
}
</script>

<script>
export let listBooks;
import BookContainer from '@components/BookContainer.svelte';
import { alert } from '@store';

if (listBooks[0] && listBooks[0].error) {
  $alert = listBooks[0].error;
  console.log($alert);
}
</script>

{#if listBooks[0] && listBooks[0].error != 'List is empty😥'}
  <BookContainer allBooks={listBooks} showDelBut="true" />
{/if}
