import { connection } from "../database/db.js";
import bcrypt from "bcrypt";
const signupPost = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    await connection.query(
      "INSERT INTO users (name, email, password) VALUES ($1,$2,$3);",
      [name, email, hashedPassword]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export { signupPost };
