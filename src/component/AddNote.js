import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContex";

function AddNote() {
  const context = useContext(noteContext);
  const { addnote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleClick = (e) => {
    console.log("Button Fired");
    e.preventDefault();
    addnote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    console.log(note);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="text">
        <h1>Add Note</h1>
      </div>
      <form action="">
        <div className="row">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={note.title}
          onChange={onChange}
        />
        </div>
        <div className="row">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          value={note.description}
          onChange={onChange}
        ></textarea>
        </div>
        <div className="row">
        <label htmlFor="tag">Tag</label>
        <input
          type="text"
          name="tag"
          id="tag"
          value={note.tag}
          onChange={onChange}
        />
        </div>
      </form>
      <button
              disabled={note.title.length < 5}
              className="btn"
              onClick={handleClick}
      >
        Submit
      </button>
    </>
  );
}

export default AddNote;
