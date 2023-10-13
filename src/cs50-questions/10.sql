SELECT DISTINCT p.name FROM people AS p
JOIN directors AS d ON d.person_id = p.id
JOIN movies AS m ON d.movie_id = m.id
JOIN ratings AS r ON m.id = r.movie_id
WHERE r.rating >= 9.0;