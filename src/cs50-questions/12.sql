SELECT DISTINCT m.title
FROM movies AS m
JOIN stars AS s1 ON m.id = s1.movie_id
JOIN people AS p1 ON s1.person_id = p1.id AND p1.name = 'Jennifer Lawrence'
JOIN stars AS s2 ON m.id = s2.movie_id
JOIN people AS p2 ON s2.person_id = p2.id AND p2.name = 'Bradley Cooper';
