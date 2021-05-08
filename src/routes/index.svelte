<style>
span {
  font-weight: bold;
}
h3 {
  text-decoration: underline rgb(231, 135, 45);
}
</style>

<svelte:head>
  <title>About</title>
</svelte:head>
<h1>What is Book Searcher?📚</h1>
<p>
  A web service, which helps you to search books using sorting and different
  filters and to find where you can read them. If you want to buy a book, this
  service will give you a buy link. You can use this app not only as authorized
  user, but also as a guest. Unfortunately, in this case you will not be allowed
  to save products to your Favorites List.
</p>

<h3>Search books(you can use logical operator AND between filters)</h3>
<ul>
  <li>
    Sort books: <span>orderBy=</span>relevance/newest (relevance - default)
  </li>
  <li>
    Filter books: <ul>
      <li>
        <span>langRestrict=</span>"en"/"fr"/...(two-letter ISO-639-1 code)
      </li>
      <li><span>filter=</span>free-ebooks/paid-ebooks,ebooks)</li>
      <li><span>printType=</span>all/books/magazines(all - default)</li>
      <li>
        <span>intitle: /inauthor: /inpublisher: /subject: </span>
      </li>
    </ul>
  </li>
</ul>
