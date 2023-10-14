CREATE TABLE movie_platforms (
    movie_id INTEGER NOT NULL,
    platform TEXT NOT NULL,
    FOREIGN KEY(movie_id) REFERENCES movies(id)
)