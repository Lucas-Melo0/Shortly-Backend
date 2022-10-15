import { connection } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import {
  getData,
  rankingData,
  userSignin,
  userSignup,
} from "../repositories/usersRepository.js";
const signupPost = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    await userSignup(name, email, hashedPassword);
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
    await userSignin(userId, token);
    return res.send({ token }).status(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const getUserData = async (req, res) => {
  try {
    const { userId } = res.locals;

    const userData = (await getData(userId)).rows;
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

const listRanking = async (req, res) => {
  try {
    const rankingStandings = (await rankingData()).rows;

    return res.send(rankingStandings).status(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export { signupPost, signinPost, getUserData, listRanking };
