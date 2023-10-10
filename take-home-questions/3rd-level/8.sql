SELECT movies.title, ratings.rating, people.name
FROM movies
JOIN directors ON directors.movie_id = movies.id
JOIN people ON people.id = directors.person_id
JOIN ratings ON ratings.movie_id = movies.id
WHERE ratings.rating > 8.5 AND people.birth > 2005
ORDER BY ratings.rating DESC;
