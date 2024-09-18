import React, { useState,useContext } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote=(props)=>{
    const context=useContext(noteContext);
    const{addNote}=context;

    const [note,setNote]=useState({tittle:"",description:"",tag:""})
    const handleClick=(e)=>{ 
        e.preventDefault();
            addNote(note.tittle,note.description,note.tag)
            setNote({tittle:"",description:"",tag:""})
            props.showAlert("Added  successfully","success");
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return(
        <div>
           <div className="container my-3">
        <h2>Add a Note</h2>
        <form className="my-3">
  <div className="mb-3">
    <label htmlFor="tittle" className="form-label">Tittle</label>
    <input type="text" className="form-control" id="tittle" name="tittle" aria-describedby="emailHelp" value={note.tittle} onChange={onChange}minLength={5} required/>
    <div id="emailHelp" className="form-text"></div>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">description</label>
    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange}minLength={5} required />
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">tag</label>
    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}minLength={5} required />
  </div>
 
  <button disabled={note.tittle.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
</div>  
        </div>
    )
}
export default AddNote;