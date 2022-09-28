## Book Searcher 🔍📚

### What is Book Searcher?

A web service, which helps you to search books using sorting and different
filters and to find where you can read them. If you want to buy a book, this
service will give you a buy link. You can use this app not only as authorized
user, but also as a guest. Unfortunately, in this case you will not be allowed
to save products to your Favorites List.

### <ins> FR </ins>:

- Authorization
- Roles
  - Guest
  - Authorized user
- As Guest you allowed to
  - search books (use logical operator AND)
    - Sort books:
      - orderBy (relevance - default, newest)
    - Filter books:
      - langRestrict (two-letter ISO-639-1 code, e.g. "en"/"fr")
      - availability (filter=free-ebooks/paid-ebooks,ebooks)
      - printType (all - default, books, magazines)
      - by title (intitle) / author (inauthor) / publisher(inpublisher) / subject(subject)
- As Authorized user you allowed to
  - Do all things that guest user can do
  - Save books to your Lists (Favorites, WantToRead, Read)
  - Estimate personally reading progress - sheets/day (user marks a desired full time and how many days a week he is going to read)

### <ins> NFR </ins>:

- SEO (Search Engine Optimization)
- Secure authorization (Password hashing)
- Linguistic duality

### <ins> Technologies </ins>:

- Sapper&Svelte
- MongoDB
- JWT(JSON Web Tokens)
- Google API Books (to show the books and info)

### Use Case diagram:

![image](https://drive.google.com/uc?export=view&id=1Q6NMFyMQnKc-K4pB67eeF3jO6bo8eQrw)A web service, which helps you to search for books using sorting and different filters.  If you want to see reviews or right, edit or delete on your self.  Users will need to create a login to access this site.  

## What is this Book Searcher?






## Visuals

- [Book Searcher Tacker Screehshot]()

### <ins> Technologies </ins>:

- Handlebars
- Heroku
- Node.js back end
- Express.js back end
- Animate.CSS



## Resources

- [LIVE SITE]()

- [Repository]()



## Credits / Reference Material
|                                                                                               | Authors                                                  |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| 1     | [Cindy Chynoweth](https://github.com/Cinderbeast)                  |
| 2     | [Phillip Rose](https://github.com/Logan2391)              |
| 3     | [Courage Cottrell](https://github.com/ccottrell52)                  |
| 4     | [Colton Vincent](https://github.com/ColtonVincent)    |
1.  
