SELECT p.name, COUNT(s.movie_id) AS movie_count
FROM people AS p
JOIN stars AS s ON p.id = s.person_id
GROUP BY p.name
HAVING movie_count >= 300;