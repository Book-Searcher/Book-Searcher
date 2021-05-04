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
ul::after {
  content: '';
  display: block;
  clear: both;
}
li {
  display: block;
  float: right;
}
.signButton {
  float: left;
  text-decoration: none;
  margin-top: 0.35em;
  padding: 0.5em 0.7em 0.5em 0.7em;
  display: block;
  border: 2px solid rgb(247, 130, 62);
  cursor: pointer;
}
.signButton:hover {
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
span {
  color: rgb(255, 62, 0);
  text-decoration: underline;
}
</style>

<script>
export let segment;
import Sign from '@components/Sign.svelte';
import Notification from '@components/Notification.svelte';
import { stores } from '@sapper/app';
import { alert } from '@store';
const { session, page } = stores();

let showSignInModal = false;
let showSignUpModal = false;
let email = '';
let password = '';

async function handleSignUp() {
  try {
    const res = await fetch('registration.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const result = await res.json();
    if (result.error == 'User is already exists') {
      $alert = result.error;
    } else {
      showSignUpModal = false;
      showSignInModal = true;
    }
  } catch (e) {
    console.error(e.message);
  }
}

async function handleSignIn() {
  try {
    const res = await fetch('login.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const result = await res.json();

    if (result.error == 'Wrong email' || result.error == 'Wrong password') {
      $alert = result.error;
    } else if (!result.accessToken) {
      $alert = 'Something Went Wrong';
    } else {
      $session.token = result.accessToken;
      showSignInModal = false;
      email = '';
      password = '';
    }
  } catch (e) {
    console.error(e.message);
  }
}
async function handleSignOut() {
  try {
    session.set({});
  } catch (e) {
    console.error(e.message);
  }
}
function handlePermission() {
  if (!$session.token) {
    showSignInModal = true;
    $alert = 'Firstly, you have to log in';
    console.log($alert);
  }
}
</script>

<nav>
  <ul>
    <li>
      <a aria-current={segment === undefined ? 'page' : undefined} href="."
        >About</a>
    </li>
    <li>
      <a
        class="listButton"
        aria-current={segment === 'list' && $page.query.type === 'readList'
          ? 'page'
          : undefined}
        href="list?type=readList"
        on:click={handlePermission}>Read List</a>
    </li>
    <li>
      <a
        class="listButton"
        aria-current={segment === 'list' &&
        $page.query.type === 'wantToReadList'
          ? 'page'
          : undefined}
        href="list?type=wantToReadList"
        on:click={handlePermission}>WantToRead List</a>
    </li>
    <li>
      <a
        class="listButton"
        rel="prefetch"
        aria-current={segment === 'list' && $page.query.type === 'favList'
          ? 'page'
          : undefined}
        href="list?type=favList"
        on:click={handlePermission}>Favourites List</a>
    </li>
    <li>
      <a aria-current={segment === 'search' ? 'page' : undefined} href="search">
        Search</a>
    </li>
    {#if $session.token}
      <li class="signButton" on:click={handleSignOut}>Log out</li>
    {:else}
      <li class="signButton" on:click={() => (showSignInModal = true)}>
        Sign In
      </li>
    {/if}

    <Sign
      shown={showSignInModal}
      on:click={() => (showSignInModal = false)}
      name="Sign In"
      bind:email
      bind:password
      on:submit={handleSignIn}>
      <p>
        Do not have an account?
        <span
          on:click={() => {
            showSignUpModal = true;
            showSignInModal = false;
          }}>Sign Up</span>
      </p>
    </Sign>

    <Sign
      shown={showSignUpModal}
      on:click={() => (showSignUpModal = false)}
      name="Sign Up"
      bind:email
      bind:password
      on:submit={handleSignUp}>
      <p>
        Already have an account?
        <span
          on:click={() => {
            showSignUpModal = false;
            showSignInModal = true;
          }}>Sign In</span>
      </p>
    </Sign>
    <Notification />
  </ul>
</nav>
