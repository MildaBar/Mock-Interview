SELECT m.title, m.year FROM movies AS m
JOIN directors AS d ON d.movie_id = m.id
JOIN people AS p ON p.id = d.person_id
WHERE p.name = 'Frank Darabont'
ORDER BY m.year DESC;