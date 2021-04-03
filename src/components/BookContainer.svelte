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
import { books } from '../store/store.js';
import BookItem from './BookItem.svelte';
</script>

<div class="book-container">
  <!-- {#if $loading}
    <h2 class="loading-text">Loading...</h2>
  {/if} -->
  {#each $books as book}
    <BookItem book={book} />
  {:else}
    <p>
      <strong>Try to find a fabulous book💡</strong>
    </p>
  {/each}
</div>
