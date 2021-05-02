<style>
.view-wrapper {
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.view {
  background-color: white;
  width: 80%;
  height: 65%;
  padding: 1rem;
  margin: 7% auto;
  border-radius: 50px;
}
.close {
  font-size: x-large;
  float: right;
  cursor: pointer;
  margin-right: 20px;
  font-size: 2em;
}
.close:hover {
  font-weight: bold;
}
.description {
  width: 55vw;
  height: 5vw;
  resize: none;
}
.title {
  font-size: 1.3em;
  margin-left: 3%;
}
.previewLink {
  color: darkblue;
  text-decoration: none;
}
.previewLink:hover {
  color: indigo;
  text-decoration: underline;
}
.bookinfo ul {
  list-style-type: none;
  text-align: left;
  padding-left: 0;
  width: 80%;
  font-size: 1.1vw;
  margin-left: 2vw;
}
.viewContainer {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas:
    'image description description description'
    'comment comment map map';
}
.bookinfo {
  grid-area: description;
  height: 18vw;
}
.fallback {
  background-image: url('/fileIcon.png');
  display: inline-block;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-left: 10%;
  min-height: 25vw;
  min-width: 13vw;
  grid-area: 'image';
}
.book_image {
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
.viewContainer input {
  width: 8vw;
}
</style>

<script>
export let wholeinfo;
export let shown = false;
const { volumeInfo } = wholeinfo;
const {
  title,
  imageLinks,
  authors,
  publishedDate,
  categories,
  description,
  language,
  pageCount,
  previewLink,
} = volumeInfo;
let days;
let estimation;
let thumbnailUrl = imageLinks ? imageLinks['thumbnail'] : '';

function estimateProgress() {
  estimation = pageCount
    ? (pageCount / days).toFixed(1)
    : 'There is no info about page count';
}
</script>

{#if shown}
  <div class="view-wrapper">
    <div class="view">
      <span class="close" on:click>&times;</span>
      <div class="title"><b>"{title}"</b></div>
      <div class="viewContainer">
        <div class="book_image_container fallback">
          <img
            class="book_image"
            src="data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            style="background-image: url({thumbnailUrl})"
            alt />
        </div>
        <div class="bookinfo">
          <ul>
            <li>
              <b>Authors: </b>
              {#if authors == undefined}
                Unknown
              {:else}
                {authors}
              {/if}
            </li>
            <li><b>Published Date: </b>{publishedDate}</li>
            <li>
              <b>Description: </b>
              {#if description}
                <textarea class="description" readonly>{description}</textarea>
              {:else}
                Unknown
              {/if}
            </li>
            <li><b>Categories: </b>"{categories}"</li>
            <li><b>Language: </b>"{language}"</li>
            <li>
              <b>PageCount: </b>
              {#if pageCount == undefined}
                Unknown
              {:else}
                {pageCount}
              {/if}
            </li>
            <li>
              <b>Book preview: </b><a class="previewLink" href={previewLink}
                >link</a>
            </li>
            <li>
              <b>Estimate personally reading progress: </b>
              <input
                bind:value={days}
                type="number"
                placeholder="days number"
                min="1" />
              <button on:click={() => estimateProgress()}>estimate</button>
              {#if estimation != undefined}
                = {estimation}
              {/if}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
{/if}
