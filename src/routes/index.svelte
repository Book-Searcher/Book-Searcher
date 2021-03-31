<style>
h1,
figure,
p {
  text-align: center;
  margin: 0 auto;
}

h1 {
  font-size: 2.8em;
  text-transform: uppercase;
  font-weight: 700;
  margin: 0 0 0.5em 0;
}

figure {
  margin: 0 0 1em 0;
}

img {
  width: 100%;
  max-width: 400px;
  margin: 0 0 1em 0;
}

p {
  margin: 1em auto;
}

@media (min-width: 480px) {
  h1 {
    font-size: 4em;
  }
}
</style>

<script>
import successkid from 'images/successkid.jpg';
</script>

<svelte:head>
  <title>Book Searcher</title>
</svelte:head>

<h1>Book Searcher</h1>

<figure>
<<<<<<< HEAD
  <img alt="Success Kid" src="{successkid}" />
  <figcaption>Find any book!</figcaption>
=======
  <img alt="Success Kid" src={successkid} />
  <figcaption>Have fun with Sapper!</figcaption>
>>>>>>> d7a7ccec0980cac98cf9d9c8ce98568a65936518
</figure>

<p>
  <strong>Try to apply not existing filters...</strong>
</p>
