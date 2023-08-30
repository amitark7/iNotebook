import React, { useContext} from "react";
import noteContext from "../context/notes/noteContex";

function Noteitem(props) {
  const contex = useContext(noteContext);
  const { deletenote } = contex;
  
  const {updateNote ,note} = props;

  const handleclick = () => {
    console.log("Fired Delete Button ...");
    deletenote(note._id);
  };

  return (
    <div className="card">
      <div className="card-body">
        <div style={{ display: "flex", alignItems: "baseline", width: "100%",justifyContent:"space-between" }}>
          <h4 className="card-title">{note.title}</h4>
          <i className="fa-solid fa-trash" onClick={handleclick}></i>
          <i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
        </div>
        <p className="card-text">{note.description}</p>
      </div>
    </div>
  );
}

export default Noteitem;
