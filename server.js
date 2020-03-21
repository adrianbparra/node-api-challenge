const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const projectsRouter = require("./projects/projectsRouter.js")
const actionRouter = require("./actions/actionsRouter.js")

const server = express()


server.use(express.json())
server.use(helmet());
server.use(morgan(':method :url :status :res[content-length] - :response-time ms'))





server.get("/", (req,res)=>{
    res.send(`Welcome to Adrian's Server!`)
})


server.use("/api/projects", projectsRouter)
server.use("/api/actions", actionRouter)






module.exports = server;