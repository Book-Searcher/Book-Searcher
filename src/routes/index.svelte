<style>
h2 {
  text-align: center;
  margin: 0 auto;
}

h2 {
  font-size: 1.5em;
  font-weight: 700;
  margin: 0 0 0.5em 0;
}

@media (min-width: 480px) {
  h2 {
    font-size: 2.5em;
  }
}
</style>

<script>
import Search from '../components/Search.svelte';
import BookContainer from '../components/BookContainer.svelte';
</script>

<svelte:head>
  <title>Book Searcher</title>
</svelte:head>
<main>
  <h2>Book Searcher</h2>
  <Search />
  <BookContainer />
</main>
