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
}
.close:hover {
  font-weight: bold;
}
.description {
  width: 95%;
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
  width: 95%;
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
.bookinfo span {
  color: rgb(74, 132, 241);
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
  title = wholeinfo?.volumeInfo?.title ?? 'No title';
  imageLinks = wholeinfo?.volumeInfo?.imageLinks ?? '';
  authors = wholeinfo?.volumeInfo?.authors ?? ['Unknown'];
  publishedDate = wholeinfo?.volumeInfo?.publishedDate ?? 'Unknown';
  pageCount = wholeinfo?.volumeInfo?.pageCount ?? 'Unknown';
  categories = wholeinfo?.volumeInfo?.categories ?? ['Unknown'];
  description = wholeinfo?.volumeInfo?.description ?? '';
  language = wholeinfo?.volumeInfo?.language ?? 'Unknown';
  previewLink = wholeinfo?.volumeInfo?.previewLink ?? '';
  buyLink = wholeinfo?.saleInfo?.buyLink ?? '';
  listPrice = wholeinfo?.saleInfo?.listPrice ?? 'Not for sale';
  thumbnailUrl = imageLinks['thumbnail'] ?? '';
}
let days;
let estimation;

function estimateProgress() {
  estimation =
    pageCount !== 'Unknown'
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
          <img class="book_image" src={thumbnailUrl} alt />
        </div>
        <div class="bookinfo">
          <ul>
            <li><b>Authors: </b>{authors}</li>
            <li><b>Published Date: </b>{publishedDate}</li>
            <li>
              <b>Description: </b>
              <textarea class="description" readonly>{description}</textarea>
            </li>
            <li><b>Categories: </b>"{categories}"</li>
            <li><b>Language: </b>"{language}"</li>
            <li>
              <b>Price: </b>
              {#if listPrice === 'Not for sale'}
                Not for sale
              {:else}
                {listPrice.amount} {listPrice.currencyCode}
              {/if}
            </li>
            <li>
              <b>Buy Link: </b>
              <a class="previewLink" href={buyLink}>link</a>
            </li>
            <li><b>PageCount: </b>{pageCount}</li>
            <li>
              <b>Book preview: </b><a class="previewLink" href={previewLink}
                >link</a>
            </li>
            <li>
              <b>Estimate personally reading progress: </b>
              <input
                bind:value={days}
                data-testid="estimation"
                type="number"
                placeholder="days number"
                min="1" />
              <button on:click={() => estimateProgress()}>estimate</button>
              {#if !!estimation}
                <span> = {estimation}</span>
              {/if}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
{/if}
