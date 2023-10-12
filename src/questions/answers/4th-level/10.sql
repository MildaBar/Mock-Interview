SELECT m1.title, MIN(r1.rating) AS min_rating FROM movies AS m1
JOIN ratings AS r1 ON r1.movie_id = m1.id
JOIN stars AS s1 ON s1.movie_id = m1.id
JOIN people AS p1 ON p1.id = s1.person_id
WHERE p1.name = 'Harrison Ford'
UNION
SELECT m2.title, MAX(r2.rating) AS max_rating FROM movies AS m2
JOIN ratings AS r2 ON r2.movie_id = m2.id
JOIN stars AS s2 ON s2.movie_id = m2.id
JOIN people AS p2 ON p2.id = s2.person_id
WHERE p2.name = 'Harrison Ford';
