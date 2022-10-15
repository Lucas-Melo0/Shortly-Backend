import { connection } from "../database/db.js";

const userSignup = (name, email, hashedPassword) => {
  return connection.query(
    "INSERT INTO users (name, email, password) VALUES ($1,$2,$3);",
    [name, email, hashedPassword]
  );
};

const userSignin = (userId, token) => {
  return connection.query(
    'INSERT INTO sessions ("userId", token) VALUES ($1,$2);',
    [userId, token]
  );
};

const getData = (userId) => {
  return connection.query(
    `SELECT "usersUrls"."userId", users.name, "usersUrls"."visitCount", urls.id AS "urlId", urls.url, urls.shorturl AS "shortUrl"
  FROM "usersUrls"  
  JOIN users ON "usersUrls"."userId" = users.id 
  JOIN urls ON "usersUrls"."urlId" = urls.id
  WHERE "usersUrls"."userId" = $1;`,
    [userId]
  );
};

const rankingData = () => {
  return connection.query(`SELECT users.id AS id, users.name, COUNT("urlId") AS "linksCount", COALESCE(SUM("visitCount"),0) AS "visitCount"
  FROM "usersUrls"
  RIGHT JOIN "users" ON "userId" = users.id
  GROUP BY users.id, users.name
  ORDER BY "visitCount" DESC
  LIMIT 10;`);
};

export { userSignup, userSignin, getData, rankingData };
