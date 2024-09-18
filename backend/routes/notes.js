const express = require('express')
const router = express.Router();
var fetchuser = require('../middleware/fetchUser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator')

//Route 1: Get All the notes using Get"/api/notes/getuser."Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server");

    }
})
//Route 2: Add a new Note using Post:"/api/notes/addnote."Login required
router.post('/addnote', fetchuser, [
    body('tittle', 'Enter a valid name').isLength({ min: 3 }),
    body('description', "Description must be atleast 5 characters").isLength({ min: 5 })
], async (req, res) => {
    try {
        const { tittle, description, tag } = req.body;
        /* if there are errors, return bad request and the errors*/
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            tittle, description, tag, user: req.user.id
        })
        const saveNote = await note.save();

        res.json(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Interanl server");

    }
})
//Route 3: upadate an exiting Note a  Put:"/api/notes/updatenote."Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { tittle, description, tag } = req.body
    //create a new object 
    try {
        const newNote = {};
        if (tittle) { newNote.tittle = tittle };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and updated it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Interanl server");

    }
})

//Route 4: Delete an exiting Note a  Delete:"/api/notes/deletenote."Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {


    try {
        // Find the note to be Delete and Deleted it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send('kya pta kya hua') }

        //Allow deletion  only if user owns this Note

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server");

    }
})

module.exports = router;
