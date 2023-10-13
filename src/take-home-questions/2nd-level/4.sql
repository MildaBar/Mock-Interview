SELECT COUNT(movie_id)
FROM directors AS d
JOIN people AS p ON p.id = d.person_id WHERE p.name = 'Martin Scorsese';