import { connection } from "../database/db.js";
import bcrypt from "bcrypt";
import { signinValidator, signupValidator } from "../validations.js";

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

const signinValidation = async (req, res, next) => {
  const { error } = signinValidator(req.body);
  if (error) return res.send(error.message).status(422);

  const { email, password } = req.body;
  const user = (
    await connection.query("SELECT * FROM users WHERE email = $1", [email])
  ).rows;

  const isValidEmail = user.find((value) => value.email === email);
  if (!isValidEmail) return res.sendStatus(401);
  const isValidPassword = bcrypt.compareSync(password, user[0].password);
  if (!isValidPassword) return res.sendStatus(401);
  res.locals.userId = user[0].id;
  next();
};

export { signupValidation, signinValidation };
