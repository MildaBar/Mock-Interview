SELECT people.name FROM people
WHERE people.id IN (
    SELECT s1.person_id FROM stars AS s1
    JOIN movies AS m1 ON m1.id = s1.movie_id
    WHERE m1.title LIKE 'Star Wars%'
) AND people.id IN (
    SELECT s2.person_id FROM stars AS s2
    JOIN movies AS m2 ON m2.id = s2.movie_id
    WHERE m2.title LIKE 'Indiana Jones%'
);