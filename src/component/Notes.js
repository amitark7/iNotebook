import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContex";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

function Notes() {
  const contex = useContext(noteContext); 

  const [note, setNote] = useState({etitle: "",edescription: "",etag: ""});

  const { notes, getNotes ,editnote} = contex;
  const [modal, setModal] = useState(1);
  let navigate=useNavigate();
  
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      navigate("/login");
    }
    //react-hooks/exhaustive-deps
    // eslint-disable-next-line
  }, []);

  const handlemodal = (currentNote) => {
    console.log("modal open");
    setNote({
      id:currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    });
    setModal(2);
  };

  const closemodal = () => {
    setModal(1);
  };

  const handleclick =(e)=>{
    console.log("Update Note Fired" ,note);
    editnote(note.id,note.etitle,note.edescription,note.etag)
    e.preventDefault()
    setModal(1);
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <AddNote />
      <div className={modal===2? "modal active" : "modal"}>
        <div className="modal-header">
          <h3>Edit Note</h3>
        </div>
        <div className="modal-body">
        <form action="">
        <div className="row">
        <label htmlFor="etitle">Title</label>
        <input
          type="text"
          name="etitle"
          id="etitle"
          value={note.etitle}
          onChange={onChange}
        />
        </div>
        <div className="row">
        <label htmlFor="edescription">Description</label>
        <input
          name="edescription"
          id="edescription"
          value={note.edescription}
          onChange={onChange}
        ></input>
        </div>
        <div className="row">
        <label htmlFor="etag">Tag</label>
        <input
          type="text"
          name="etag"
          id="etag"
          value={note.etag}
          onChange={onChange}
        />
        </div>
      </form>
        </div>
        <div className="modal-footer">
          <button className="btn" onClick={closemodal}>
            Close
          </button>
          <button className="btn" onClick={handleclick}>
            Update Note
          </button>
        </div>
      </div>
      <div className="notes">
        <h2>Your Notes</h2>
        <div className="note-content">
          {notes.map((note) => {
            return (
              <Noteitem key={note._id} note={note} updateNote={handlemodal} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Notes;
