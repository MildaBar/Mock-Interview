SELECT people.name, COUNT(stars.movie_id) AS movie_count FROM people JOIN stars ON people.id = stars.person_id GROUP BY people.name HAVING movie_count >= 300;