import sqlite from "better-sqlite3";

const dbPath = "movies.db";
const db = sqlite(dbPath);

const args = process.argv.slice(2);
const movie1 = args[0];
const year1 = args[1];
const movie2 = args[2];
const year2 = args[3];

if (!movie1 || !year1 || !movie2 || !year2) {
  process.stdout.write(
    "Please provide the titles and years of two movies you want to compare."
  );
  process.exit(1);
}

const query =
  "SELECT ratings.rating FROM ratings JOIN movies ON movies.id = ratings.movie_id WHERE movies.title = ? AND movies.year = ?";
const statement = db.prepare(query);
const resultMovie1 = statement.all(movie1, year1);
const resultMovie2 = statement.all(movie2, year2);

if (resultMovie1.length === 0 || resultMovie2.length === 0) {
  process.stdout.write(`No such movie. Try again.`);
} else {
  const ratingMovie1 = resultMovie1[0].rating;
  const ratingMovie2 = resultMovie2[0].rating;

  if (ratingMovie1 > ratingMovie2) {
    process.stdout.write(
      `${year1} year movie '${movie1}' has a higher rating: ${ratingMovie1}.`
    );
  } else {
    process.stdout.write(
      `${year2} year movie '${movie2}' has a higher rating: ${ratingMovie2}.`
    );
  }
}

db.close();
