SELECT DISTINCT p.name FROM people AS p
JOIN stars AS s1 ON p.id = s1.person_id
JOIN movies AS m1 ON s1.movie_id = m1.id
WHERE m1.id IN (
    SELECT m2.id FROM movies AS m2
    JOIN stars AS s2 ON m2.id = s2.movie_id
    JOIN people AS p2 ON s2.person_id = p2.id
    WHERE p2.name = 'Kevin Bacon' AND p2.birth = 1958
)
AND p.name != 'Kevin Bacon';