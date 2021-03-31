<style>
h2,
p {
  text-align: center;
  margin: 0 auto;
}

h2 {
  font-size: 1.5em;
  font-weight: 700;
  margin: 0 0 0.5em 0;
}

p {
  margin: 1em auto;
}
.Search {
  text-align: center;
}
.Search input {
  width: 65%;
  height: 2.2em;
}
.Search button {
  width: 10%;
  height: 2.3em;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  background: rgb(247, 130, 62);
  border: 2px solid rgb(107, 42, 5);
  color: #fff;
  cursor: pointer;
  outline: none;
}
.Search button:hover {
  background: #fff;
  color: rgb(247, 130, 62);
}
@media (min-width: 480px) {
  h2 {
    font-size: 2.5em;
  }
}
</style>

<script>
</script>

<svelte:head>
  <title>Book Searcher</title>
</svelte:head>

<h2>Book Searcher</h2>

<form class="Search">
  <input type="Search" name="Search" />
  <button>Search</button>
</form>

<p>
  <strong>Try to find a fabulous book💡</strong>
</p>
