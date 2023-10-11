SELECT title, year FROM movies JOIN directors ON directors.movie_id = movies.id JOIN people ON people.id = directors.person_id WHERE people.name = 'George Lucas' ORDER BY movies.year DESC;