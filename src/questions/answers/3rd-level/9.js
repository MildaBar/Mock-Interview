import sqlite from "better-sqlite3";
const dbPath = "movies.db";
const db = sqlite(dbPath);

const query96 =
  "SELECT ratings.rating FROM ratings JOIN movies ON movies.id = ratings.movie_id WHERE movies.title = 'Independence Day' AND movies.year = 1996";

const query97 =
  "SELECT ratings.rating FROM ratings JOIN movies ON movies.id = ratings.movie_id WHERE movies.title = 'Men in Black' AND movies.year = 1997";

const statement96 = db.prepare(query96);
const statement97 = db.prepare(query97);

const rows96 = statement96.all();
const rows97 = statement97.all();

const rating96 = rows96[0].rating;
const rating97 = rows97[0].rating;

if (rating96 > rating97) {
  console.log(
    `1996 year movie 'Independence Day has higher rating: ${rating96}`
  );
} else {
  console.log(`1997 year movie 'Men in Black' hasd higher rating: ${rating97}`);
}

db.close();
