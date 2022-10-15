import { connection } from "../database/db.js";

const getUserUrl = (url) => {
  return connection.query("SELECT * FROM urls WHERE url =$1;", [url]);
};

const insertUrl = (url, shortUrl) => {
  return connection.query('INSERT INTO urls (url,"shorturl") VALUES ($1,$2);', [
    url,
    shortUrl,
  ]);
};

const getInsertedUrl = (url) => {
  return connection.query("SELECT * FROM urls WHERE url = $1;", [url]);
};

const updatingMidddleTable = (userId, urlId) => {
  connection.query(
    'INSERT INTO "usersUrls" ("userId","urlId","visitCount") VALUES ($1,$2,$3);',
    [userId, urlId, 1]
  );
};

const getUrl = (id) => {
  return connection.query("SELECT * FROM urls WHERE id = $1;", [id]);
};

const countUpdater = (id) => {
  return connection.query(
    'UPDATE "usersUrls" SET "visitCount" = "visitCount" + 1 WHERE "urlId" = $1;',
    [id]
  );
};

const deleteReference = (id) => {
  return connection.query(`DELETE FROM "usersUrls" WHERE "urlId" = $1;`, [id]);
};
const deleteUrl = (id) => {
  return connection.query("DELETE FROM urls WHERE id = $1;", [id]);
};

export {
  getUserUrl,
  insertUrl,
  getInsertedUrl,
  updatingMidddleTable,
  getUrl,
  countUpdater,
  deleteReference,
  deleteUrl,
};
