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
span {
  color: rgb(255, 62, 0);
  text-decoration: underline;
}
</style>

<script>
export let segment;
import Sign from './Sign.svelte';
import Notification from './Notification.svelte';

let showSignInModal = false;
let showSignUpModal = false;
let email = '';
let password = '';
let wrongUserNotif = false;
let wrongEmailNotif = false;
let wrongPassNotif = false;

async function handleSignUp() {
  try {
    if (!(await isSameUser(email))) {
      await fetch('search.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      showSignUpModal = false;
      showSignInModal = true;
      email = '';
      password = '';
    } else {
      wrongUserNotif = true;
    }
  } catch (e) {
    console.error(e.message);
  }
}

async function isSameUser(email) {
  let isExists = false;
  try {
    const res = await fetch('search.json');
    const allUsers = await res.json();
    allUsers.forEach((user) => {
      if (user.email == email) isExists = true;
    });
    return isExists;
  } catch (e) {
    console.error(e.message);
  }
}

async function handleSignIn() {
  try {
    const res = await fetch('search.json');
    const allUsers = await res.json();
    allUsers.forEach((user) => {
      if (user.email == email && user.password == password) {
        showSignInModal = false;
        email = '';
        password = '';
      } else if (user.email == email && user.password != password) {
        wrongPassNotif = true;
      } else {
        wrongEmailNotif = true;
      }
    });
  } catch (e) {
    console.error(e.message);
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
      <a aria-current={segment === 'search' ? 'page' : undefined} href="search">
        Search</a>
    </li>
    <li id="signIn" on:click={() => (showSignInModal = true)}>Sign In</li>

    <Sign
      shown={showSignInModal}
      on:click={() => (showSignInModal = false)}
      name="Sing In"
      email={email}
      password={password}
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
      name="Sing Up"
      email={email}
      password={password}
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

    <Notification
      showNotification={wrongUserNotif}
      message="User is already exists" />
    <Notification
      showNotification={wrongEmailNotif}
      message="Email is incorrect" />
    <Notification
      showNotification={wrongPassNotif}
      message=" Password is incorrect" />
  </ul>
</nav>
