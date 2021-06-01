<style>
main {
  max-width: 56em;
  background-color: lightgoldenrodyellow;
  padding: 2em;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>

<script>
import Nav from '@components/Nav.svelte';
</script>

<Nav />

<main>
  <slot />
</main>
