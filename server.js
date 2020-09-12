const express = require('express');


const projectRouter = require("./data/project/projectRouter");
const actionRouter = require("./data/action/actionRouter");

const helmet = require("helmet");
const morgan = require("morgan");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use((error, req, res, next) => {
    console.log(error);
    res.status(error.code).json({ error });
  })

server.get("/", (req, res) => {
    res.status(200).json({ message: "The server is online!" })
})

server.use("/api/project", projectRouter)
server.use("/api/action", actionRouter)

module.exports = server;
