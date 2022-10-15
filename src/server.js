import express from "express";
import usersRouter from "./routes/usersRoutes.js";
import urlsRouter from "./routes/urlRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const server = express();
server.use(express.json());
server.use(cors());
server.use(usersRouter);
server.use(urlsRouter);

server.listen(process.env.PORT, () =>
  console.log(`listen on ${process.env.PORT}`)
);
