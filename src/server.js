import express from "express";
import usersRouter from "./routes/usersRoutes.js";
import urlsRouter from "./routes/urlRoutes.js";
const server = express();
server.use(express.json());
server.use(usersRouter);
server.use(urlsRouter);

server.listen(4000, () => console.log("listen on 4000"));
