<script context="module">
export async function preload() {
  try {
    const res = await fetch('favList.json');
    if (res.ok) {
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
      console.log(favBooks);
      return { favBooks };
    } else {
      const msg = await res.text();
      this.error(res.statusCode, msg);
    }
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
