const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Note');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
//Rout1: Get All the Notes Using:Get "api/auth/getuser".
router.get('/fetchallnotes', fetchuser, async (req, res) => {
        try {
                const notes = await Notes.find({ user: req.user.id });
                res.json(notes)
        } catch (error) {
                console.error(error.message);
                res.status(500).send('Internal Server Error');
        }

})
//Rout2: Add a new Notes Using:Get "api/notes/addnote".
router.post('/addnote', fetchuser, [
        body('title', 'Enter a valid title').isLength({ min: 3 }),
        body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
        try {
                const { title, description, tag } = req.body;
                // If there are errors, return Bad request and the error
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return res.status(400).json({ errors: errors.array() });
                }
                const note = new Note({
                        title, description, tag, user: req.user.id
                })
                const savedNote = await note.save()
                res.json(savedNote);
        } catch (error) {
                console.error(error.message);
                res.status(500).send('Internal Server Error');
        }

})
//Rout3: Update an existing  Notes Using:Get "api/notes/updatenote".Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
        const { title, description, tag } = req.body;
        //Creat a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        try {
                //Find the user to be updated and update it       
                let note = await Note.findById(req.params.id);
                if (!note) {
                        return res.status(404).send("Note Not Found");
                }
                // Check if the user owns the note
                if (note.user.toString() !== req.user.id) {
                        return res.status(401).send("Not Allowed");
                }
                // Update the note
                note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
                if (!note) {
                        return res.status(404).send("Note Not Found After Update");
                }
                res.json({ note });
        } catch (error) {
                console.error(error);
                res.status(500).send("Internal Server Error");
        }
});
//Rout4: Delete  an existing  Notes Using:Get "api/notes/deletenote".Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
        try {
                //Find the user to be updated and update it       
                let note = await Note.findById(req.params.id);
                if (!note) {
                        return res.status(404).send("Note Not Found");
                }
                // Check if the user owns the note
                if (note.user.toString() !== req.user.id) {
                        return res.status(401).send("Not Allowed");
                }
                // Delete the Note
                note = await Note.findByIdAndDelete(req.params.id);
                res.json({ "Success": "Note has been deleted", note: note });
        } catch (error) {
                console.error(error);
                res.status(500).send("Internal Server Error");
        }
});
module.exports = router;