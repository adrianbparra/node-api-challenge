const express = require('express');

const actionsDb = require("../data/helpers/actionModel")

const actionsRouter = express.Router();


actionsRouter.get("/", (req,res)=> {

    actionsDb.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {res.status(500).json({errorMessage: "Unable to get Actions.", err})})
})


actionsRouter.get("/:id",validateById, (req,res)=> {

    res.status(200).json(req.action)

})

actionsRouter.post("/", validateAction, (req,res)=>{
    // res.status(201).json(req.body)

    actionsDb.insert(req.body)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(err => res.status(500).json({errorMessage: "Unable to add action", err}))
})


actionsRouter.put("/:id", validateById, validateAction, (req,res)=> {
    
    const {id} = req.params;
    
    actionsDb.update(id, req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => res.status(500).json({errorMessage: "Unable to update Action.", err}))

})

actionsRouter.delete("/:id", validateById, (req,res)=> {
    const {id} = req.params;

    actionsDb.remove(id)
        .then(count => {
            res.status(200).json({recordsDeleted: count, actionDeleted: req.action})
        })
        .catch(err => res.status(500).json({errorMessage:"Unable to remove action", err}))
    
})




function validateAction (req,res,next) {

    if(Object.entries(req.body).length > 0){

        const action = req.body;

        if("project_id" in action && "description" in action && "notes" in action) {
            next()
        } else {
            res.status(400).json({message: "project_id, description, notes are required."})
        }
        

    } else {
        res.status(400).json({message: "Body is required."})
    }
}

function validateById (req,res,next) {
    const {id} = req.params;

    actionsDb.get(id)
        .then(action => {
            if(action) {
                req.action = action
                next()
            } else {
                res.status(404).json({message: "No Actions match with that ID"})
            }
        })
        .catch(err => res.status(500).json({errorMessage: "Unable to retrieve Action"}))
    
}





module.exports = actionsRouter