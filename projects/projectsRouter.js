const express = require('express');

const projectsdb = require("../data/helpers/projectModel")


const projectsRouter = express.Router();






projectsRouter.get("/", (req,res) =>{

    projectsdb.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => res.status(500).json({errorMessage: "Unable to retreive Projects"}))
})


projectsRouter.get("/:id", validateByID, (req,res)=>{


    res.status(200).json(req.project)
    
})

projectsRouter.post("/", validateProject, (req,res) => {


    // res.status(201).json(req.project)
    projectsdb.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err=> res.status(500).json({errorMessage: "Unable to add Project."}))
    
})

projectsRouter.put("/:id", validateByID, validateProject, (req,res) => {

    const {id} = req.params;

    projectsdb.update(id, req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => res.status(500).json({errorMessage: "Unable to Update Project."}))

})

projectsRouter.delete("/:id", validateByID, (req,res) => {
    const {id} = req.params;

    projectsdb.remove(id)
        .then(count => {
            res.status(200).json({recordsDeleted: count, deletedProject : req.project.name})
        })
        .catch(err => res.status(500).json({errorMessage: "Unable to delete Project."}))

    
})


module.exports = projectsRouter;

function validateProject (req,res, next) {

    if(Object.entries(req.body).length > 0){

        const project = req.body;

        if("name" in project && "description" in project) {
            next()
        } else {
            res.status(400).json({message: "Name and Description are required."})
        }
        

    } else {
        res.status(400).json({message: "Body is required."})
    }
}


function validateByID (req, res, next) {

    const {id} = req.params;

    projectsdb.get(id)
        .then(project => {
            if(project) {
                req.project = project
                next()
            } else {
                res.status(404).json({message: "No Projects match with that ID"})
            }
        })
        .catch(err => res.status(500).json({errorMessage: "Unable to retrieve Project"}))
}

