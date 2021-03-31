<style>
.sign-wrapper {
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.sign {
  background-color: white;
  width: 30%;
  height: 50%;
  padding: 1rem;
  margin: 12% auto;
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
</style>

<script>
let shown = false;
export function show() {
  shown = true;
}
export function hide() {
  shown = false;
}
</script>

{#if shown}
  <div class="sign-wrapper">
    <div class="sign">
      <span class="close" on:click={() => hide()}>&times;</span>
      <slot />
    </div>
  </div>
{/if}
