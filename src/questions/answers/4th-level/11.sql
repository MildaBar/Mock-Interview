SELECT movies.title, COUNT(stars.person_id) AS actor_count FROM movies
JOIN stars ON stars.movie_id = movies.id
GROUP BY movies.title
ORDER BY actor_count DESC
LIMIT 3;