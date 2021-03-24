## Book Searcher 🔍📚

### What is Book Searcher?

A web service, which helps you to search books using sorting and different filters and to find where you can read them. If you want to buy a book in the paper version, this service will propose the nearest store and the store with lowest price based on your location. You can use this app not only as authorized user, but also as a guest. Unfortunately, in this case you will not be allowed to rate and save products to your Favorites List.

### <ins> FR </ins>:

- Authorization
  - Directly
  - With Google account
- Roles
  - Guest
  - Authorized user
- As Guest you allowed to
  - Book search:
    - Filter by title, author, genre etc
    - Sort books by year, average price, alphabet etc
    - Use logical operators (OR, AND, NOT)
  - Find where you can read them
  - Find where you can buy them in the paper version using Google maps
- As Authorized user you allowed to
  - Do all things that guest user can do
  - Put a tick on the read books
  - Rate read books
  - Save books to your Favorites List
  - Share a book on Social Networks
  - Leave a book review
  - Estimate personally reading progress - sheets/day (user marks a desired full time and how many days a week he is going to read)

### <ins> NFR </ins>:

- SEO (Search Engine Optimization)
- Secure authorization (Password hashing)
- Linguistic duality

### <ins> Technologies </ins>:

- Sapper&Svelte
- PostgreSQL
- JWT(JSON Web Tokens)
- Fuse.js
- Google API  
   (Google API and Maps are involved in project to show the store on map and to show the path to it.)  
   (Google API Books are involved in project to show the books and info)
   
### Use Case diagram:
![image](https://drive.google.com/uc?export=view&id=1Q6NMFyMQnKc-K4pB67eeF3jO6bo8eQrw)

### ER diagram:
![image](https://drive.google.com/uc?export=view&id=1duU58xOduSvlQAKuI722bSZcGvhKKOb8)
