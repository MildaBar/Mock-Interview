SELECT SUBSTR(movies.title, 1, 1) AS title_letter, AVG(ratings.rating) AS avg_rating
FROM movies
JOIN ratings ON movies.id = ratings.movies_id
WHERE movies.title GLOB '[A-Z]*'
GROUP BY title_letter ORDER BY title_letter ASC;