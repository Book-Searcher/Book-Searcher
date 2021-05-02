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
h1 {
  color: rgb(255, 62, 0);
  text-shadow: 2px 1px 0px rgba(0, 0, 0, 0.3);
}
form label {
  font-weight: bold;
}
form input {
  padding: 0.5em;
  margin-bottom: 0.4em;
  background: rgb(247, 130, 62);
  border: 2px solid rgb(107, 42, 5);
  color: #fff;
}
input::placeholder {
  color: #fff;
}
button {
  padding: 0.5em;
  font-weight: bold;
  background-color: floralwhite;
  color: rgb(59, 29, 11);
  border-radius: 8px;
  font-size: large;
}
</style>

<script>
export let shown = false;
export let name = '';
export let email = '';
export let password = '';
</script>

{#if shown}
  <div class="sign-wrapper" on:click|self>
    <div class="sign">
      <h1>{name}</h1>
      <form on:submit|preventDefault>
        <label for="email">Email Address</label><br />
        <input
          bind:value={email}
          type="email"
          placeholder="Email Address"
          name="email"
          required /><br />
        <label for="password">Password</label><br />
        <input
          bind:value={password}
          type="password"
          placeholder="Password"
          name="password"
          minlength="6"
          required /><br /><br />
        <button type="submit">Apply</button>
      </form>
      <slot />
    </div>
  </div>
{/if}
