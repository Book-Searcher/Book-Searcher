<style>
.book-container {
  padding-left: 7%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>

<script>
import BookItem from '@components/BookItem.svelte';
export let allBooks;
export let showDelBut = false;
</script>

<div class="book-container">
  {#each allBooks as book}
    <BookItem book={book} showDelBut={showDelBut} />
  {/each}
</div>
