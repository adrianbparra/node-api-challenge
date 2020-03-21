const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");


const server = express()


server.use(express.json())
server.use(helmet());
server.use(morgan(':method :url :status :res[content-length] - :response-time ms'))


server.get("/", (req,res)=>{
    res.send(`Welcome to Adrian's Server!`)
})





module.exports = server;