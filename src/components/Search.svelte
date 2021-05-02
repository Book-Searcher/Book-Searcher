<style>
.Search {
  text-align: center;
}
.Search input {
  width: 65%;
  height: 2.2em;
}
.Search button {
  min-width: 10%;
  min-height: 2.3em;
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
import { books } from '@store';
import { alert } from '@store';
let searchText = '';

async function searchBooks() {
  if (searchText) {
    let text = searchText.replace(/ /g, '+');
    await fetch('search.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        books.set(result);
      })
      .catch((error) => {
        console.error('ERROR: ' + error);
      });
  } else {
    $alert = 'Please enter something';
    console.log($alert);
  }
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
