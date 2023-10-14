import sqlite from "better-sqlite3";

const dbPath = "movies.db";
const db = sqlite(dbPath);

const args = process.argv.slice(2);
const movieTitle = args[0];
const movieYear = args[1];

// check if both movie title and release year are provided
if (!movieTitle || !movieYear) {
  process.stdout.write("Please provide a movie title and release year.\n");
  process.exit(1);
}

const insertMovieAndRatings = db.transaction(() => {
  try {
    // check if a movie with the same title and release year already exists
    const query = "SELECT title, year FROM movies WHERE title = ? AND year = ?";
    const statement = db.prepare(query);
    const rows = statement.all(movieTitle, movieYear);

    if (rows.length > 0) {
      process.stdout.write(
        "Movie with this title and release year already exists in the database.\n"
      );
      return;
    }

    // insert data into the movies table
    const insertMovieData = "INSERT INTO movies (title, year) VALUES (?, ?)";
    const prepareMoviesDataStatement = db.prepare(insertMovieData);
    const addMovieData = prepareMoviesDataStatement.run(movieTitle, movieYear);
    const movieId = addMovieData.lastInsertRowid;

    // insert data into the ratings table
    const insertRatingsData =
      "INSERT INTO ratings (movie_id, rating, votes) VALUES (?, 0, 0)";
    const prepareRatingsDataStatement = db.prepare(insertRatingsData);
    prepareRatingsDataStatement.run(movieId);

    process.stdout.write(`Movie added to the database with ID: ${movieId}\n`);
    return movieId;
  } catch (err) {
    console.error("Transaction failed:", err.message);
    throw err;
  }
});

try {
  const movieId = insertMovieAndRatings();
  if (db.inTransaction) {
    db.commit();
  }
} catch (err) {
  if (db.inTransaction) {
    db.rollback();
  }
  console.error("Transaction failed:", err.message);
}
