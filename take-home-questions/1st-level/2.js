import sqlite from "better-sqlite3";

const dbPath = "movies.db";
const db = sqlite(dbPath);

const query =
  "SELECT name, birth FROM people WHERE birth IS NOT NULL ORDER BY birth ASC LIMIT 10";

const statement = db.prepare(query);
const rows = statement.all();

const results = [];
const today = new Date().getFullYear();

rows.forEach((row) => {
  const birthYear = row.birth;
  const yearsPassed = today - birthYear;
  results.push({ name: row.name, yearsPassed });
});

results.forEach((result) => {
  console.log(`Name: ${result.name}, Years Passed: ${result.yearsPassed}`);
});

db.close();
