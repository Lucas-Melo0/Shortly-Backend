import { connection } from "../database/db.js";
import { nanoid } from "nanoid";
import {
  countUpdater,
  deleteReference,
  deleteUrl,
  getInsertedUrl,
  getUrl,
  getUserUrl,
  insertUrl,
  updatingMidddleTable,
} from "../repositories/urlRepository.js";
const urlShortener = async (req, res) => {
  try {
    const { url } = req.body;
    const userUrl = (await getUserUrl(url)).rows;
    const isShortened = userUrl.find((value) => value.url === url);
    if (isShortened) {
      return res.send({ shortUrl: userUrl[0].shorturl }).status(201);
    }

    const shortUrl = nanoid(10);
    await insertUrl(url, shortUrl);

    const insertedUrl = (await getInsertedUrl(url)).rows;

    const urlId = insertedUrl[0].id;
    const { userId } = res.locals;
    updatingMidddleTable(userId, urlId);

    return res.send({ shortUrl }).status(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const listUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const url = (await getUrl(id)).rows;
    const isValidUrl = url.find((value) => value.id == id);
    if (!isValidUrl) return res.sendStatus(404);

    return res.send(url).status(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const urlRedirect = async (req, res) => {
  try {
    const { storedUrl } = res.locals;
    const { url, id } = storedUrl[0];
    const countUpdate = await countUpdater(id);
    return res.redirect(url);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const urlDeletion = async (req, res) => {
  try {
    const { id } = req.params;
    const referenceDeletion = await deleteReference(id);
    const deletion = await deleteUrl(id);
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
export { urlShortener, listUrl, urlRedirect, urlDeletion };
