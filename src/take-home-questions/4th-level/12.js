import sqlite from "better-sqlite3";

const dbPath = "movies.db";
const db = sqlite(dbPath);

const args = process.argv.slice(2);
const movieTitle = args[0];
const movieYear = args[1];

// check if both movie and title are provided
if (!movieTitle || !movieYear) {
  console.log("Please provide a movie title and release date");
  process.exit(1);
}

const transaction = db.transaction(() => {
  try {
    // check if movie and title already exists
    const query = "SELECT title, year FROM movies WHERE title = ? AND year = ?";
    const statement = db.prepare(query);
    const rows = statement.all(movieTitle, movieYear);

    if (rows.length > 0) {
      console.log(
        "Movie with this title and release year already exists in the database."
      );
      process.exit(1);
    }

    // instert data into movies table
    const insertMovieData = "INSERT INTO movies (title, year) VALUES (?, ?)";
    const prepareMoviesDataStatement = db.prepare(insertMovieData);
    const addMovieData = prepareMoviesDataStatement.run(movieTitle, movieYear);
    const movieId = addMovieData.lastInsertRowid;

    // insert data into the ratings table
    const insertRatingsData =
      "INSERT INTO ratings (movie_id, rating, votes) VALUES (?, 0, 0)";
    const prepareRatingsDataStatement = db.prepare(insertRatingsData);
    prepareRatingsDataStatement.run(movieId);

    console.log("Movie added to the database with ID:", movieId);
  } catch (error) {
    console.log("Error:", error.message);
    throw error;
  }
});

try {
  transaction();
  console.log("Transaction committed successfully.");
} catch (error) {
  console.log("Transaction failed:", error);
  process.exit(1);
}
