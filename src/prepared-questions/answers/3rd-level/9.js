import sqlite from "better-sqlite3";

// Star Wars: Episode IV - A New Hope|1977
// Star Wars: Episode IX - The Rise of Skywalker|2019

const dbPath = "movies.db";
const db = sqlite(dbPath);

const args = process.argv.slice(2);
const movie1 = args[0];
const year1 = args[1];
const movie2 = args[2];
const year2 = args[3];

if (!movie1 || !year1 || !movie2 || !year2) {
  console.log(
    "Please provide the titles and years of two movies you want to compare."
  );
  process.exit(1);
}

const query =
  "SELECT ratings.rating FROM ratings JOIN movies ON movies.id = ratings.movie_id WHERE movies.title = ? AND movies.year = ?";
const statement = db.prepare(query);
const result_movie1 = statement.all(movie1, year1);
const result_movie2 = statement.all(movie2, year2);

if (result_movie1.length === 0 || result_movie2.length === 0) {
  console.log(`No such movie. Try again.`);
} else {
  const rating_movie1 = result_movie1[0].rating;
  const rating_movie2 = result_movie2[0].rating;

  if (rating_movie1 > rating_movie2) {
    console.log(
      `${year1} year movie '${movie1}' has a higher rating: ${rating_movie1}`
    );
  } else {
    console.log(
      `${year2} year movie '${movie2}' has a higher rating: ${rating_movie2}`
    );
  }
}

db.close();
