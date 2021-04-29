<script context="module">
export async function preload(page, session) {
  try {
    const res = await this.fetch('favList.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': session.token,
      },
    });
    const books = await res.json();

    let favBooks = [];
    books.forEach((book) => {
      favBooks.push({
        volumeInfo: {
          title: book.title,
          authors: book.authors,
          publishedDate: book.publishedDate,
          description: book.description,
          categories: book.categories,
          language: book.language,
          pageCount: book.pageCount,
          imageLinks: { thumbnail: book.img },
          link: book.link,
        },
      });
    });
    return { favBooks };
  } catch (e) {
    this.error(500, e.message);
  }
}
</script>

<script>
export let favBooks;
import BookContainer from '../../components/BookContainer.svelte';
</script>

<BookContainer allBooks={favBooks} />
