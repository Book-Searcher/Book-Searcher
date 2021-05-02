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
  background-image: url('/fileIcon.png');
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
</style>

<script>
import author from '@static/suspect.png';
import View from '@components/View.svelte';
//import Notification from '@components/Notification.svelte';
import { stores } from '@sapper/app';

const { session } = stores();
export let book;
let view;
const { volumeInfo } = book;
const {
  title,
  imageLinks,
  authors,
  publishedDate,
  pageCount,
  //categories,
  description,
  language,
  previewLink,
} = volumeInfo;

let thumbnailUrl = imageLinks ? imageLinks['thumbnail'] : '';
// let wrongNotif = false;
// let notifMessage = '';

async function addBookToFavList() {
  try {
    await fetch('favList.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': $session.token,
      },
      body: JSON.stringify({
        owner: $session.userId,
        title,
        publishedDate,
        description,
        language,
        pageCount,
        img: thumbnailUrl,
        link: previewLink,
      }),
    });
    //const result = await res.json();
    // if (result.error == 'The book already exists') {
    //   notifMessage = result.error;
    //   wrongNotif = true;
    // }
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
      <img
        class="book_image"
        src="data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        style="background-image: url({thumbnailUrl})"
        alt />
    </div>
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
    <!-- <Notification showNotification={wrongNotif} message={notifMessage} /> -->
  </div>
</div>
