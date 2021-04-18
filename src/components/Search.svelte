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
.close {
  font-size: 1.2em;
  cursor: pointer;
  font-weight: bold;
}
.close:hover {
  color: red;
}
</style>

<script>
import { books } from '../store/store.js';

let searchText = '';

function searchBooks() {
  let url = `https://www.googleapis.com/books/v1/volumes?q=
       ${searchText.replace(
         / /g,
         '+'
       )}&key=AIzaSyCvAVFHWN1O04iMY1_BwQDP8xSXnUyJ4q8`;
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
function clearText() {
  books.set([]);
  searchText = '';
}
function changeText() {
  books.set([]);
}
</script>

<form class="Search">
  <input
    id="searchBar"
    type="text"
    name="Search"
    placeholder="Title, author, ..."
    bind:value={searchText}
    on:change={() => changeText()} />
  <span class="close" on:click={() => clearText()}>&times;</span>
  <button on:click|preventDefault={() => searchBooks()}>Search</button>
</form>
