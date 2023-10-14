SELECT p.name
FROM people AS p
JOIN stars AS s ON s.person_id = p.id
JOIN movies AS m ON m.id = s.movie_id
WHERE m.title LIKE 'Star Wars%'
INTERSECT
SELECT p.name
FROM people AS p
JOIN stars AS s ON s.person_id = p.id
JOIN movies AS m ON m.id = s.movie_id
WHERE m.title LIKE 'Indiana Jones%';