import { connection } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
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

const signinPost = async (req, res) => {
  try {
    const { userId } = res.locals;
    const token = uuidv4();
    await connection.query(
      'INSERT INTO sessions ("userId", token) VALUES ($1,$2);',
      [userId, token]
    );
    return res.send({ token }).status(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const getUserData = async (req, res) => {
  try {
    const { userId } = res.locals;
    const userData = (
      await connection.query(
        `SELECT "usersUrls"."userId", users.name, "usersUrls"."visitCount", urls.id AS "urlId", urls.url, urls.shorturl AS "shortUrl"
  FROM "usersUrls"  
  JOIN users ON "usersUrls"."userId" = users.id 
  JOIN urls ON "usersUrls"."urlId" = urls.id
  WHERE "usersUrls"."userId" = $1;`,
        [userId]
      )
    ).rows;
    let visitCount = 0;
    userData.forEach((e) => (visitCount += e.visitCount));
    const object = {
      id: userData[0].userId,
      name: userData[0].name,
      visitCount: visitCount,
      shortenedUrls: userData.map((value) => {
        return {
          id: value.urlId,
          shortUrl: value.shortUrl,
          url: value.url,
          visitCount: value.visitCount,
        };
      }),
    };

    return res.send(object).status(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export { signupPost, signinPost, getUserData };
