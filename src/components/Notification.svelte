<style>
div {
  position: fixed;
  cursor: pointer;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  border-radius: 0.2rem;
  background-color: rgba(255, 0, 0, 0.637);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 700;
  padding: 0.5rem 1.4rem;
  font-size: 1.5rem;
  z-index: 100;
  opacity: 95%;
}
div p {
  color: #fff;
}
</style>

<script>
import { alert } from '@store';
</script>

{#if $alert}
  <div on:click={() => ($alert = '')}>
    <p>{$alert}</p>
  </div>
{/if}
