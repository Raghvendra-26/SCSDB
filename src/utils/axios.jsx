import axios from 'axios'

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTRlNWIxYzk5NmYxYmI1MTE2OGE1YjY0MzE3ZDlhNSIsIm5iZiI6MTc0Mjg4MDY5My45NDMsInN1YiI6IjY3ZTIzZmI1YTYzYmNjNDk5N2RjNjNiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QVaNmgkmRhM3FTjEo7UhRheQ8h1HYMLELU6z3MwOxTA'
      }
})

export default instance;