<style>
.book-item {
  background-color: rgba(233, 210, 162, 0.993);
  border-radius: 30px;
  height: 300px;
  width: 300px;
  padding: 10px;
  margin-bottom: 25px;
  margin-top: 10px;
  text-align: center;
}
.bookInfo {
  display: flex;
  flex-direction: row;
}
.buttons-container {
  flex-direction: column;
}
.buttons-container button {
  cursor: pointer;
  width: 150px;
  height: 2.3em;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  border: 2px solid rgb(107, 42, 5);
  outline: none;
  margin-bottom: 10px;
}
.viewButton {
  background: #fff;
  color: rgb(247, 130, 62);
}
.viewButton:hover {
  background: rgb(247, 130, 62);
  color: #fff;
}
.listButton {
  background: rgb(247, 130, 62);
  color: #fff;
}
.listButton:hover {
  background: #fff;
  color: rgb(247, 130, 62);
}
.title {
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 300px;
}
.author {
  margin-top: 5px;
  display: flex;
  align-items: baseline;
  text-align: left;
}
.author h4 {
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 270px;
  overflow: hidden;
}
.author img {
  height: 10%;
  width: 10%;
}
.fallback {
  background-image: url('/fileIcon.png ');
  display: inline-block;
  min-width: 140px;
  min-height: 210px;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
.book_image {
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
.deleteButton {
  background: rgb(212, 20, 20);
  color: #fff;
}
.deleteButton:hover {
  background: rgb(173, 16, 16);
}
</style>

<script>
import author from '@static/suspect.png';
import View from '@components/View.svelte';
import { alert } from '@store';
// import { goto } from '@sapper/app';
export let book;
export let showDelBut = false;

let shownView = false;
let title,
  imageLinks,
  authors,
  publishedDate,
  pageCount,
  categories,
  description,
  language,
  previewLink,
  buyLink,
  listPrice,
  thumbnailUrl;
$: {
  title = book?.volumeInfo?.title ?? 'No title';
  imageLinks = book?.volumeInfo?.imageLinks ?? '';
  authors = book?.volumeInfo?.authors ?? ['Unknown'];
  categories = book?.volumeInfo?.categories ?? ['Unknown'];
  publishedDate = book?.volumeInfo?.publishedDate ?? 'Unknown';
  pageCount = book?.volumeInfo?.pageCount ?? 'Unknown';
  description = book?.volumeInfo?.description ?? '';
  language = book?.volumeInfo?.language ?? 'Unknown';
  previewLink = book?.volumeInfo?.previewLink ?? '';
  buyLink = book?.saleInfo?.buyLink ?? '';
  listPrice = book?.saleInfo?.listPrice ?? 'Not for sale';
  thumbnailUrl = imageLinks['thumbnail'] ?? '';
}

async function addBookToList(event) {
  try {
    let type = event.target.name;
    const res = await fetch(`list.json?type=${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        publishedDate,
        description,
        language,
        pageCount: pageCount,
        img: thumbnailUrl,
        link: previewLink,
        authors: authors.join(),
        categories: categories.join(),
        buyLink,
        amount:
          listPrice === 'Not for sale' ? 'Not for sale' : listPrice.amount,
        currencyCode:
          listPrice === 'Not for sale' ? '' : listPrice.currencyCode,
      }),
    });

    const result = await res.json();
    if (result.error === 'The book already exists') {
      $alert = result.error;
      console.log($alert);
    }
    if (result.error === 'No token provided!') {
      $alert = 'Firstly, you have to log in';
      console.log($alert);
    }
  } catch (e) {
    console.error(e.message);
  }
}
async function deleteFromList() {
  try {
    await fetch(`list.json${window.location.search}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: book._id,
      }),
    });
    if (typeof process !== 'object') location.reload();
    // goto(`/list?type=${$page.query.type}`);
  } catch (e) {
    console.error(e.message);
  }
}
</script>

<div class="book-item">
  <h3 class="title">
    {title}
  </h3>
  <div class="bookInfo">
    <div class="book_image_container fallback">
      <img class="book_image" src={thumbnailUrl} alt />
    </div>
    <div class="buttons-container">
      <button class="viewButton" on:click={() => (shownView = true)}
        >View</button>
      <View
        shown={shownView}
        on:click={() => (shownView = false)}
        wholeinfo={book} />

      <button class="listButton" name="wantToReadList" on:click={addBookToList}
        >WantToReadList</button>
      <button class="listButton" name="readList" on:click={addBookToList}
        >ReadList</button>
      <button class="listButton" name="favList" on:click={addBookToList}
        >FavList</button>
      {#if showDelBut}
        <button class="deleteButton" on:click={deleteFromList}>Delete</button>
      {/if}
    </div>
  </div>
  <div class="author">
    <img alt="author" src={author} />
    <h4>{authors}</h4>
  </div>
</div>
