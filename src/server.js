import express from "express";
import usersRouter from "./routes/usersRoutes.js";
const server = express();
server.use(express.json());
server.use(usersRouter);

server.listen(4000, () => console.log("listen on 4000"));
