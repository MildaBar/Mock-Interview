SELECT movies.title FROM movies JOIN ratings ON ratings.movie_id = movies.id WHERE movies.title LIKE 'Star Wars%' ORDER BY ratings.rating DESC LIMIT 3;