<style>
p {
  padding-right: 7%;
  margin-top: 0;
  justify-self: center;
  grid-column: 1 / span 2;
}
.book-container {
  padding-left: 7%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>

<script>
import BookItem from '@components/BookItem.svelte';
export let allBooks;
</script>

<div class="book-container">
  {#each allBooks as book}
    <BookItem book={book} />
  {:else}
    <p>
      <strong>Try to find a fabulous book💡</strong>
    </p>
  {/each}
</div>
