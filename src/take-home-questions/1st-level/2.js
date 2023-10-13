import sqlite from "better-sqlite3";

const dbPath = "movies.db";
const db = sqlite(dbPath);

const query =
  "SELECT name, birth FROM people WHERE birth IS NOT NULL ORDER BY birth LIMIT 10";

const statement = db.prepare(query);
const rows = statement.all();

const today = new Date().getFullYear();

rows.forEach((row) => {
  const birthYear = row.birth;
  const peopleName = row.name;
  const passedYear = today - birthYear;

  console.log(`name: ${peopleName}, years passed: ${passedYear} `);
});

db.close();
