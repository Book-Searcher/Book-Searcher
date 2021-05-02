<style>
.notification {
  width: 20vw;
  height: 3vw;
  line-height: 3vw;
  border-radius: 20px;
  margin: 1vw auto;
  background-color: rgba(255, 0, 0, 0.637);
  text-align: center;
}
.notification span {
  color: aliceblue;
  text-decoration: none;
  font-weight: 600;
}
.notification-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
}
.closeNotification {
  font-weight: bold;
  cursor: pointer;
}
.closeNotification:hover {
  color: black;
}
</style>

<script>
export let showNotification = false;
export let message = '';
</script>

{#if showNotification}
  <div class="notification-wrapper">
    <div class="notification">
      <span>{message}</span>
      <span class="closeNotification" on:click>&times;</span>
    </div>
  </div>
{/if}
