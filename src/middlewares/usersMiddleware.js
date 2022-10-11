import { connection } from "../database/db.js";
import { signupValidator } from "../validations.js";

const signupValidation = async (req, res, next) => {
  const { error } = signupValidator(req.body);

  if (error) return res.send(error.message).status(422);
  const { email, name } = req.body;
  const users = (
    await connection.query("SELECT * FROM users WHERE email = $1;", [email])
  ).rows;
  const isDuplicate = users.find(
    (user) => user.email === email || user.name === name
  );
  if (isDuplicate) return res.sendStatus(409);
  next();
};

export { signupValidation };
