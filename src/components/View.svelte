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
  height: 87%;
  padding: 1rem;
  margin: 2% auto;
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
.viewContainer {
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;
}
#comment {
  background-color: brown;
  width: 50%;
  height: 20vw;
}
#bookImg {
  height: 18vw;
  width: 14vw;
  margin-top: 9%;
}
#title {
  font-size: 1.3em;
  margin-left: 3%;
}
#previewLink {
  color: darkblue;
  text-decoration: none;
}
#previewLink:hover {
  color: indigo;
  text-decoration: underline;
}
#bookinfo ul {
  list-style-type: none;
  text-align: left;
  padding-left: 0;
  width: 80%;
}
#description {
  width: 55vw;
  height: 5vw;
  resize: none;
}
</style>

<script>
export let wholeinfo;
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
import fileIcon from '../../static/fileIcon.png';
let thumbnailUrl;

if (imageLinks) {
  const { thumbnail } = imageLinks;
  thumbnailUrl = thumbnail;
} else {
  thumbnailUrl = fileIcon;
}

let shown = false;
export function show() {
  shown = true;
}
export function hide() {
  shown = false;
}
</script>

{#if shown}
  <div class="view-wrapper">
    <div class="view">
      <span class="close" on:click={() => hide()}>&times;</span>
      <div id="title"><b>"{title}"</b></div>
      <div class="viewContainer">
        <img id="bookImg" src={thumbnailUrl} alt="cover" />
        <div id="bookinfo">
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
                <textarea id="description">{description}</textarea>
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
              <b>Book preview: </b><a id="previewLink" href={previewLink}
                >link</a>
            </li>
          </ul>
        </div>
        <div id="comment" />
      </div>
      <slot />
    </div>
  </div>
{/if}
