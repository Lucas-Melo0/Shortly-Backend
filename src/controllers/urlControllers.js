import { connection } from "../database/db.js";
import { nanoid } from "nanoid";
const urlShortener = async (req, res) => {
  try {
    const { url } = req.body;
    const userUrl = (
      await connection.query("SELECT * FROM urls WHERE url =$1;", [url])
    ).rows;
    const isShortened = userUrl.find((value) => value.url === url);
    if (isShortened)
      return res.send({ shortUrl: userUrl[0].shorturl }).status(201);

    const shortUrl = nanoid(10);
    await connection.query(
      'INSERT INTO urls (url,"shorturl") VALUES ($1,$2);',
      [url, shortUrl]
    );

    const insertUrl = (
      await connection.query("SELECT * FROM urls WHERE url = $1;", [url])
    ).rows;

    const urlId = insertUrl[0].id;
    const { userId } = res.locals;
    const middleTableUpdate = await connection.query(
      'INSERT INTO "usersUrls" ("userId","urlId","visitCount") VALUES ($1,$2,$3);',
      [userId, urlId, 1]
    );

    return res.send({ shortUrl }).status(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const listUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const url = (
      await connection.query("SELECT * FROM urls WHERE id = $1;", [id])
    ).rows;
    const isValidUrl = url.find((value) => value.id == id);
    if (!isValidUrl) return res.sendStatus(404);

    return res.send(url).status(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const urlRedirect = async (req, res) => {
  try {
    const { storedUrl } = res.locals;
    const { url, id } = storedUrl[0];
    const countUpdate = await connection.query(
      'UPDATE "usersUrls" SET "visitCount" = "visitCount" + 1 WHERE "urlId" = $1;',
      [id]
    );
    return res.redirect(url);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const urlDeletion = async (req, res) => {
  try {
    const { id } = req.params;
    const referenceDeletion = await connection.query(
      `DELETE FROM "usersUrls" WHERE "urlId" = $1;`,
      [id]
    );
    const deletion = await connection.query("DELETE FROM urls WHERE id = $1;", [
      id,
    ]);
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
export { urlShortener, listUrl, urlRedirect, urlDeletion };
