import dotenv from "dotenv";
import sqlite from "better-sqlite3";

dotenv.config({
  path: ".env",
});

const favDir = process.env.FAVORITE_DIRECTOR;
const dbPath = "movies.db";
const db = sqlite(dbPath);

if (!favDir) {
  process.stdout.write(
    "Please write your favorite directors name in .env file"
  );
  process.exit(1);
}

const query =
  "SELECT m.title FROM movies AS m JOIN directors AS d ON m.id = d.movie_id JOIN people AS p ON p.id = d.person_id JOIN ratings AS r ON r.movie_id = m.id WHERE p.name = ? ORDER BY r.rating DESC";

const statement = db.prepare(query);
const rows = statement.all(favDir);

rows.forEach((row) => process.stdout.write(`${row.title}\n`));

db.close();
