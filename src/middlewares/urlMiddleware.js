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

  next();
};

export { urlValidation };
