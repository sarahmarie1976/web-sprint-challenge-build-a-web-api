const express = require("express");
const projectModel = require("../helpers/projectModel");

const router = express.Router();

// Create

router.post("/", (req, res) => {
    const projectInfo = req.body
    projectModel
    .insert(projectInfo)
    .then( () => {
        res.status(201).json(({ message: "Your project was created!" }))
    })
    
})



// Read

router.get("/", (req, res) => {
    projectModel
    .get(req.id)
    .then( (e) => {
        res.status(200).json(e)
    })
    .catch( error => {
        console.log(error);
        res.status(500).json({ message: "Error retreiving project!" })
    })
})



// Update

router.put("/:id", (req, res) => {
    const projectInfo = req.body
    const { id } = req.params

    projectModel
    .update(id, projectInfo)
    .then( (e) => {
        if (e) {
            res.status(200).json({ message: "Your project has been updated!" })
        } else {
            res.status(404).json({ message: "your project could not be updated, data wasn't found!" })
        }
    })
    .catch( error => {
        res.status(500).json({ error: "There was an error updating your project!" })
    })
})



// Delete

router.delete("/:id", (req, res) => {
    projectModel
    .remove(req.params.id)
    .then( (e) => {
        if (e > 0) {
            res.status(200).json({ message: "Your project has been deleted!" })  
        } else {
            res.status(404).json({ message: "Your project could not be deleted, data wasn't found!" })
        }
    })
    .catch( error => {
        console.log(error);
        res.status(500).json({ error: "There was an error deleting your project!" })

    })
})



// Get projects 

router.get("/:id/action",  (req, res) => {
    projectModel
    .getProjectActions(req.params.id)
    .then( (e) => {
        res.status(200).json(e);    
    })
    .catch( error => {
        console.log(error);
        res.status(500).json({ error: "Error retrieving your action for this project!" }) 
    })
})


module.exports = router;