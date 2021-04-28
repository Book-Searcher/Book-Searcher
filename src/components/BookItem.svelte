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
.bookImg {
  display: flex;
  flex-direction: row;
}
.bookImg img {
  height: 70%;
  width: 45%;
}
.buttons-container {
  flex-direction: column;
}
.buttons-container button {
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
</style>

<script>
import author from '../../static/suspect.png';
import fileIcon from '../../static/fileIcon.png';
import View from './View.svelte';
import { stores } from '@sapper/app';

const { session } = stores();
export let book;
let thumbnailUrl;
let view;
const { volumeInfo } = book;
const { title, imageLinks, authors } = volumeInfo;

if (imageLinks) {
  const { thumbnail } = imageLinks;
  thumbnailUrl = thumbnail;
} else {
  thumbnailUrl = fileIcon;
}

async function addBookToFavList() {
  // console.log('Test' + $session.token);
  await fetch('favList.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': $session.token,
    },
    body: JSON.stringify({
      title,
      owner: $session.userId,
    }),
  });
}
</script>

<div class="book-item">
  <h3 class="title">
    {title}
  </h3>
  <div class="bookImg">
    <img src={thumbnailUrl} alt="cover" />
    <div class="buttons-container">
      <button class="viewButton" on:click={() => view.show()}>View</button>
      <View bind:this={view} wholeinfo={book} />
      <button class="listButton">WantToReadList</button>
      <button class="listButton">ReadList</button>
      <button class="listButton" on:click={addBookToFavList}>FavList</button>
    </div>
  </div>
  <div class="author">
    <img alt="author" src={author} />
    <h4>
      {#if authors == undefined}
        Unknown
      {:else}
        {authors}
      {/if}
    </h4>
  </div>
</div>
