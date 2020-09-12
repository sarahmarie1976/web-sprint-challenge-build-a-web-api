const express = require('express');


const projectRouter = require("./data/project/projectRouter");
const actionRouter = require("./data/action/actionRouter");

const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
    res.status(200).json({ message: "The server is online!" })
})

server.use("/api/project", projectRouter)
server.use("/api/action", actionRouter)

module.exports = server;
