SELECT m.title, r.rating, p.name
FROM movies AS m
JOIN stars AS s ON s.movie_id = m.id
JOIN people AS p ON p.id = s.person_id
JOIN ratings AS r ON r.movie_id = m.id
WHERE r.rating > 8.5 AND p.birth > 2005
ORDER BY r.rating DESC;
