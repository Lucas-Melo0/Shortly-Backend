import { connection } from "../database/db.js";
import { nanoid } from "nanoid";
const urlShortener = async (req, res) => {
  try {
    const { url } = req.body;
    const bigUrl = (
      await connection.query("SELECT * FROM urls WHERE url =$1;", [url])
    ).rows;
    const isShortened = bigUrl.find((value) => value.url === url);
    if (isShortened) return res.send(bigUrl.shortUrl).status(201);

    const shortUrl = nanoid(10);
    await connection.query(
      'INSERT INTO urls (url,"shorturl") VALUES ($1,$2);',
      [url, shortUrl]
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
export { urlShortener, listUrl };
