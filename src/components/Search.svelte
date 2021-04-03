<style>
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
</style>

<script>
import { books } from '../store/store.js';
let searchText = '';

function searchBooks(text) {
  let url = `https://www.googleapis.com/books/v1/volumes?q=
       ${text.replace(/ /g, '+')}&key=AIzaSyCvAVFHWN1O04iMY1_BwQDP8xSXnUyJ4q8`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      books.set(result.items);
    })
    .catch((error) => {
      console.error('ERROR: ' + error);
    });
}
</script>

<form class="Search">
  <input
    id="searchBar"
    type="Search"
    name="Search"
    placeholder="Title, author, ..."
    bind:value={searchText} />
  <button on:click|preventDefault={searchBooks(searchText)}>Search</button>
</form>
