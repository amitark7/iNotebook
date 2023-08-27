const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../Module/Notes");
const { body, validationResult } = require("express-validator");



//Route:1 Fetch All Notes Using GET:api/notes/fetchallnotes ..Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    //Get Notes
    const note = await Notes.find({ user: req.user.id });
    res.json(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

//Route:2 Add Notes Using POST:api/notes/addnote ..Login Required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter Vallid Title").isLength({ min: 3 }),
    body("description", "Description At least 8 character").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      //if Bad Request Given Then Show Error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //Add Notes
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Error Occured");
    }
  }
);

//Route:3 Get Update In Existing Notes Using PUT:api/notes/updatenote/:d ..Login Required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    //if Bad Request Given Then Show Error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Create A New Notes
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //let Find The Id To Updated And Update It
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() == !req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

//Route:4 To Delete Exiting Note Using PUT:api/notes/deletenote/:id ..Login Required
router.put("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //let Find The Id To Updated And Update It
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    //Allow Deletion Only User Own Note
    if (note.user.toString() == !req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Sucess: "Note Has Been Deleted", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

module.exports = router;
