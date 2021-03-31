<style>
nav {
  border-bottom: 1px solid rgba(255, 62, 0, 0.1);
  font-weight: 300;
  padding: 0 1em;
}

ul {
  margin: 0;
  padding: 0;
}

/* clearfix */
ul::after {
  content: '';
  display: block;
  clear: both;
}

li {
  display: block;
  float: right;
}
#signIn {
  float: left;
  text-decoration: none;
  margin-top: 0.35em;
  padding: 0.5em 0.7em 0.5em 0.7em;
  display: block;
  border: 2px solid rgb(247, 130, 62);
}

#signIn:hover {
  background-color: rgb(247, 130, 62);
  color: white;
}

[aria-current] {
  position: relative;
  display: inline-block;
}

[aria-current]::after {
  position: absolute;
  content: '';
  width: calc(100% - 1em);
  height: 2px;
  background-color: rgb(255, 62, 0);
  display: block;
  bottom: 5px;
}

a {
  text-decoration: none;
  padding: 1em 0.5em;
  display: block;
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
span {
  color: rgb(255, 62, 0);
  text-decoration: underline;
}
</style>

<script>
export let segment;
import Sign from './Sign.svelte';
let signIn;
let signUp;
</script>

<nav>
  <ul>
    <li>
      <a aria-current={segment === 'about' ? 'page' : undefined} href="about"
        >About</a>
    </li>
    <li>
      <a
        aria-current={segment === 'readList' ? 'page' : undefined}
        href="readList">Read List</a>
    </li>
    <li>
      <a
        aria-current={segment === 'wantToReadList' ? 'page' : undefined}
        href="wantToReadList">WantToRead List</a>
    </li>
    <li>
      <a
        aria-current={segment === 'favList' ? 'page' : undefined}
        href="favList">Favourites List</a>
    </li>
    <li>
      <a aria-current={segment === undefined ? 'page' : undefined} href=".">
        Search</a>
    </li>
    <li id="signIn" on:click={() => signIn.show()}>Sign In</li>
    <Sign bind:this={signIn}>
      <h1>Sign In</h1>
      <form>
        <label for="email">Email Address</label><br />
        <input type="email" placeholder="Email Address" name="email" /><br />
        <label for="password">Password</label><br />
        <input
          type="password"
          placeholder="Password"
          name="password" /><br /><br />
        <button>Apply</button>
      </form>
      <p>
        Do not have an account? <span
          on:click={() => {
            signUp.show();
            signIn.hide();
          }}>Sign Up</span>
      </p>
    </Sign>
    <Sign bind:this={signUp}>
      <h1>Sign Up</h1>
      <form>
        <label for="email">Email Address</label><br />
        <input type="email" placeholder="Email Address" name="email" /><br />
        <label for="password">Password</label><br />
        <input
          type="password"
          placeholder="Password"
          name="password" /><br /><br />
        <button>Apply</button>
      </form>
      <p>
        Already have an account? <span
          on:click={() => {
            signUp.hide();
            signIn.show();
          }}>Sign In</span>
      </p>
    </Sign>
  </ul>
</nav>
