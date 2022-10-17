import { connection } from "../database/db.js";
import { urlValidator } from "../validations.js";

const urlValidation = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const user = (
    await connection.query("SELECT * FROM sessions WHERE token = $1", [token])
  ).rows;

  const isValidToken = user.find((value) => value.token === token);
  if (!token || !isValidToken) return res.sendStatus(401);

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

const deletionValidation = async (req, res, next) => {
  try {
    const { id: urlId } = req.params;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const user = (
      await connection.query("SELECT * FROM sessions WHERE token = $1", [token])
    ).rows;
    const isValidToken = user.find((value) => value.token === token);
    const userId = user[0]?.userId;

    const url = (
      await connection.query('SELECT * FROM "usersUrls" WHERE "urlId" = $1', [
        urlId,
      ])
    ).rows;

    const isUrlFromUser = url.find((value) => value.userId === userId);

    if (url.length === 0) return res.sendStatus(404);

    if (!authorization || !isValidToken || !isUrlFromUser) {
      return res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
  next();
};

export { urlValidation, shortUrlValidation, deletionValidation };
