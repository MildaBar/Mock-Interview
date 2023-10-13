SELECT SUBSTR(m.title, 1, 1) AS title_letter, ROUND(AVG(r.rating), 2) AS avg_rating
FROM movies AS m
JOIN ratings AS r ON m.id = r.movie_id
WHERE m.title GLOB '[A-Z]*'
GROUP BY title_letter
ORDER BY title_letter ASC;