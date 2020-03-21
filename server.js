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

server.use(errorLogger);

function errorLogger (req,res,next) {
    res.status(404).json({errorMessage: "URI does not exist!"})
    next()
}



module.exports = server;