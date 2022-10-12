import { connection } from "../database/db.js";
import { urlValidator } from "../validations.js";

const urlValidation = async (req, res, next) => {
  const { authorization } = req.headers;
  const user = (
    await connection.query("SELECT * FROM sessions WHERE token = $1", [
      authorization,
    ])
  ).rows;

  const isValidToken = user.find((value) => value.token === authorization);
  if (!authorization || !isValidToken) return res.sendStatus(401);

  const { error } = urlValidator(req.body);
  if (error) return res.send(error.message).status(422);
  res.locals.userId = user[0].userId;
  next();
};

const shortUrlValidation = async (req, res, next) => {
  const { shortUrl } = req.params;
  const storedUrl = (
    await connection.query("SELECT * FROM urls WHERE shorturl = $1;", [
      shortUrl,
    ])
  ).rows;
  const isShortened = storedUrl.find((value) => value.shorturl === shortUrl);
  if (!isShortened) return res.sendStatus(404);

  res.locals.storedUrl = storedUrl;
  next();
};

export { urlValidation, shortUrlValidation };
