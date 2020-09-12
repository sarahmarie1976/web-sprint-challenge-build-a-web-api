const express = require("express");
const actionModel = require("../helpers/actionModel");

const router = express.Router();

// Create

router.post("/", (req, res) => {
    const actionInfo = req.body
    actionModel
    .insert(actionInfo)
    .then( (e) => {
        res.status(201).json([{message: "Action added!"}, e]);
    })
    .catch( error => {
        res.status(500).json({ error: "Error creating action" })
    })
})


 
// Read

router.get("/", (req, res) => {
    actionModel
    .get(req.id)
    .then( (e) => {
        res.status(200).json(e)
    })
    .catch( error => {
        console.log(error)
        res.status(500).json({ error: "Error retrieving actions" })
    })    
})



// Update

router.put('/:id',  (req, res, next) => {
    const actionInfo = req.body

    const { id } = req.params
    actionModel
    .update(id, actionInfo)
    .then( (e) => {
        if (e) {
            res.status(200).json({ message: "Your action has been updated" })
        } else {
            res.status(404).json({ message: "Your action could not be found" })
        }
    })
    .catch(error => {
        next(error);
      })
})



// Delete

router.delete('/:id',   (req, res, next) => {
    actionModel
    .remove(req.params.id)
    .then( e => {
        if (e > 0){
            res.status(200).json({ message: "Action was successfully been deleted" })
        } else {
            req.status(404).json({ message: "Action could not be found" })
        }
    })
    .catch(error => {
        next(error);
      })
})


// Valadation






module.exports = router;