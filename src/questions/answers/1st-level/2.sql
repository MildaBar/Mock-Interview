SELECT m.title FROM movies AS m
JOIN ratings AS r ON r.movie_id = m.id
WHERE m.title LIKE 'Star Wars%'
ORDER BY r.rating DESC
LIMIT 3;