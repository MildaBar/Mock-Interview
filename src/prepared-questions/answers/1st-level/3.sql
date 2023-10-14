SELECT title, year
FROM movies
WHERE title LIKE 'Harry Potter%'
AND year BETWEEN 2000 AND 2010
ORDER BY year;