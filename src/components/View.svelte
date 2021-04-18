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
#description {
  width: 55vw;
  height: 5vw;
  resize: none;
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
  font-size: 1.1vw;
  margin: 0;
}
.viewContainer {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas:
    'image description description description'
    'comment comment map map';
}
#bookinfo {
  grid-area: description;
  height: 18vw;
}
#bookImg {
  margin-left: 10%;
  height: 18vw;
  width: 13vw;
  grid-area: 'image';
}
#comment {
  background-color: wheat;
  grid-area: comment;
  text-align: left;
}
#mycomment textarea {
  resize: none;
  margin: 2%;
  min-width: 28vw;
  min-height: 3vw;
}
#mycomment {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
#mycomment button {
  margin: 15% 10%;
  width: 8vw;
}
#map {
  grid-area: map;
  background-color: plum;
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
                <textarea id="description" readonly>{description}</textarea>
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
        <div id="comment">
          <div id="mycomment">
            <textarea placeholder="Leave a comment" />
            <button>submit</button>
          </div>
        </div>
        <div id="map" />
      </div>
      <slot />
    </div>
  </div>
{/if}
