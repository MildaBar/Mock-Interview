import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});
import sqlite from "better-sqlite3";

const favDir = process.env.FAVORITE_DIRECTOR;
console.log(favDir);

const dbPath = "movies.db";
const db = sqlite(dbPath);

const query =
  "SELECT title FROM movies JOIN directors ON directors.movie_id = movies.id JOIN people ON people.id = directors.person_id JOIN ratings ON ratings.movie_id = movies.id WHERE people.name = ? ORDER BY ratings.rating DESC";

const statement = db.prepare(query);

const rows = statement.all(favDir);

const results = rows.map((row) => row.title);

db.close();

console.log(results);
