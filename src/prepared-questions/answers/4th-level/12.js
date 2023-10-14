import sqlite from "better-sqlite3";

const dbPath = "movies.db";
const db = sqlite(dbPath);

const args = process.argv.slice(2);
const movieTitle = args[0];
const movieYear = args[1];
const moviePlatform = args[2];

// check users input
if (!movieTitle || !movieYear || !moviePlatform) {
  process.stdout.write(
    `Please provide necessary information: movie title, release year, platform.\n`
  );
  process.exit(1);
}

// check if the movie exists in the database
const checkMovieQuery =
  "SELECT title, year, id FROM movies WHERE title = ? AND year = ?";

const checkMovieStatement = db.prepare(checkMovieQuery);
const checkMovieResult = checkMovieStatement.all(movieTitle, movieYear);

if (!checkMovieResult) {
  process.stdout.write("There are no such movie.\n");
  process.exit(1);
}

const movieId = checkMovieResult[0].id;

// check if movie platform already exists
const checkPlatformQuery =
  "SELECT platform FROM movie_platforms WHERE movie_id = ?";
const checkPlatformStatement = db.prepare(checkPlatformQuery);
const checkPlatformResult = checkPlatformStatement.all(movieId);

if (checkPlatformResult.length > 0) {
  process.stdout.write("Platform for this movie already exists.\n");
  process.exit(1);
}

// insert data
const insertPlatform = db.transaction(() => {
  try {
    const insertPlatformQuery =
      "INSERT INTO movie_platforms (movie_id, platform) VALUES (?, ?)";
    const insertPlatformStatement = db.prepare(insertPlatformQuery);
    insertPlatformStatement.run(movieId, moviePlatform);
  } catch (err) {
    process.stdout.write("Error:", err + "\n");
  }
});

try {
  insertPlatform();
  if (db.inTransaction) {
    db.commit();
  }
  process.stdout.write(
    `Successfully added ${moviePlatform} platform for the movie '${movieTitle}' released in ${movieYear}.\n`
  );
} catch (err) {
  if (db.inTransaction) {
    db.rollback();
  }
  process.stdout.write("Transaction failed:", err.message + "\n");
}
