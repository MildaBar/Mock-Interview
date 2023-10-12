import sqlite from "better-sqlite3";

const dbPath = "movies.db";
const db = sqlite(dbPath);

const args = process.argv.slice(2);
const movieTitle = args[0];
const movieYear = args[1];
const movieRating = parseFloat(args[2]);

if (!movieTitle || !movieYear || isNaN(movieRating)) {
  console.log(
    "Please provide a valid movie title, release year, and a rating between 0 and 10."
  );
  process.exit(1);
} else if (movieRating < 0 || movieRating > 10) {
  console.log("The movie rating number range is from 0 to 10.");
  process.exit(1);
}

try {
  db.transaction(() => {
    const oldRatingQuery =
      "SELECT ratings.rating FROM ratings JOIN movies ON movies.id = ratings.movie_id WHERE movies.title = ? AND movies.year = ?";
    const statement = db.prepare(oldRatingQuery);
    const row = statement.get(movieTitle, movieYear);

    if (!row) {
      console.log("There are no such movie or year. Try again.");
    } else {
      const oldRating = row.rating;

      const insertRatingQuery = "INSERT INTO ratings (rating) VALUES (?)";
      const insertRatingStatement = db.prepare(insertRatingQuery);
      const result = insertRatingStatement.run(movieRating);

      if (result.changes > 0) {
        console.log(
          `Successfully added a new rating to the movie '${movieTitle}' released in ${movieYear} from ${oldRating} to ${movieRating}.`
        );
      } else {
        console.log("Failed to add a new rating.");
        throw new Error("Transaction failed.");
      }
    }
  })();

  db.commit();

  console.log("Transaction committed successfully.");
} catch (error) {
  console.log("Transaction failed:", error.message);
  db.rollback();
}
