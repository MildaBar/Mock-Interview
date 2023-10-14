SELECT m.title, COUNT(s.movie_id) AS star_count
FROM movies AS m
JOIN stars AS s ON m.id = s.movie_id
GROUP BY m.title
ORDER BY star_count DESC
LIMIT 3;
