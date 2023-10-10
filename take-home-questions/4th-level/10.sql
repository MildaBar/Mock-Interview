INSERT INTO ratings (movie_id, rating, votes)
SELECT movies.id, 9.0, 0
FROM movies
WHERE movies.title = 'Oppenheimer' AND movies.year = 2023;

