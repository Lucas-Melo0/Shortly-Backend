import { connection } from "../database/db.js";
import bcrypt from "bcrypt";
import { signinValidator, signupValidator } from "../validations.js";

const signupValidation = async (req, res, next) => {
  const { error } = signupValidator(req.body);
  if (error) return res.status(422).send(error.message);

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
  if (error) return res.status(422).send(error.message);

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

const userValidation = async (req, res, next) => {
  const { authorization } = req.headers;
  const user = (
    await connection.query("SELECT * FROM sessions WHERE token = $1", [
      authorization,
    ])
  ).rows;

  if (user.length === 0) return res.sendStatus(404);

  const isValidToken = user.find((value) => value.token === authorization);
  if (!authorization || !isValidToken) return res.sendStatus(401);
  res.locals.userId = user[0].userId;
  next();
};

export { signupValidation, signinValidation, userValidation };
