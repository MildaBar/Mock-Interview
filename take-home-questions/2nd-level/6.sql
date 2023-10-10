SELECT movies.title, movies.year FROM movies JOIN directors ON movies.id = directors.movie_id JOIN people ON people.id = directors.person_id WHERE people.name = 'Frank Darabont' ORDER BY movies.year DESC;