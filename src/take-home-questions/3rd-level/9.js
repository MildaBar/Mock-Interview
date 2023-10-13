import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});
import sqlite from "better-sqlite3";

const favDir = process.env.FAVORITE_DIRECTOR;
const dbPath = "movies.db";
const db = sqlite(dbPath);

if (!favDir) {
  console.log("Please write your favorite directors name in .env file");
  process.exit(1);
}

const query =
  "SELECT m.title FROM movies AS m JOIN directors AS d ON m.id = d.movie_id JOIN people AS p ON p.id = d.person_id JOIN ratings AS r ON r.movie_id = m.id WHERE p.name = ? ORDER BY r.rating DESC";

const statement = db.prepare(query);
const rows = statement.all(favDir);

const results = rows.forEach((row) => console.log(row.title));

db.close();
