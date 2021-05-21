<style>
p {
  text-align: center;
}
</style>

<script context="module">
export async function preload(page) {
  try {
    const res = await this.fetch(`list.json?type=${page.query.type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const books = await res.json();
    let listBooks = [];
    if (books && books.length !== 0 && !books.error) {
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
</script>

{#if listBooks.length !== 0}
  <BookContainer allBooks={listBooks} showDelBut="true" />
{:else}
  <p>
    <strong>Try to find a fabulous book💡</strong>
  </p>
{/if}
