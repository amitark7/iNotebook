import { useState } from "react";
import NoteContext from "./noteContex";

const NoteState = (props) => {
  const host = "https://inotebook-1c77.onrender.com";
  const noteInitial = [];
  const [notes, setnotes] = useState(noteInitial);


  //Get All Notes 
  const getNotes = async (title, description, tag) => {
    console.log("New Note Added");
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setnotes(json);
  };

  //Add New notes 
  const addnote = async (title, description, tag) => {
    console.log("New Note Added");
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setnotes(notes.concat(note));
  };


  //Updated Existing Notes
  const editnote = async (id, title, description, tag) => {
    console.log("Note Updated Successfully");
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);
  };


  //Delete Existing Notes
  const deletenote = async (id) => {
    console.log("Note Deleted Succesfully");
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const note = await response.json();
    console.log(note);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, setnotes, addnote, deletenote, getNotes, editnote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
