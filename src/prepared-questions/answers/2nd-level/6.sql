SELECT ROUND(AVG(r.rating), 2) FROM ratings AS r
JOIN movies AS m ON m.id = r.movie_id
WHERE m.year = 2010;