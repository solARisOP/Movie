
🔗[fasal-movie-library.onrender.com](https://fasal-movie-library-ic4c.onrender.com)

# Fasal Movie Library

This project allows users to make lists of movies/shows they like and keep them in collections and users can search for movies and shows.


# Tech Stack

* Node, Express: Server side.

# Features

* Content Searching: Authorized Users can search for movies/shows.
* Creating lists: Users can create lists to keep there favorite collections at one place of shows and movies.
* CRUD: view, update and delete lists.


## Run Locally

Clone the project

```bash
  git clone https://github.com/solARisOP/Movie.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
  npm install nodemon
```

## Environment Variables

```bash
  PORT = PORT_ON_WHICH_YOU_WANNA_RUN_THIS_SERVICE
  jwt_secret = YOUR_SECRET_PHRASE_FOR_JWT_TOKEN
  MONGO_URI = YOUR_LOCAL_OR_CLOUD_MONGODB_URL
  API_OMDB = YOUR_OMDB_API_KEY
```

Start the server

```bash
  npm run dev
```
