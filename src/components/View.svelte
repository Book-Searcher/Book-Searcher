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
  text-align: center;
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
#comment {
  background-color: brown;
  width: 40%;
  height: 15vw;
}
</style>

<script>
export let wholeinfo;
const { volumeInfo } = wholeinfo;
const { title, imageLinks, authors } = volumeInfo;
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
      <div>{title}</div>
      <img src={thumbnailUrl} alt="cover" />
      <div id="comment" />
      <slot />
    </div>
  </div>
{/if}
