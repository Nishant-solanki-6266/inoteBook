import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState=(props)=>{
  const host="http://localhost:5000"
    const notesInitial=[]



//  Get All Notes
 const getNotes=async()=>{
  //API call
  const response=await fetch(`${host}/api/notes/fetchallnotes`,{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'auth-token':localStorage.getItem('token')
    },
  });
  const json=await response.json()
console.log(json);
 setNotes(json)
}




    const[notes,setNotes]= useState(notesInitial);


    // Add a Note
    const addNote=async(tittle,description,tag)=>{
      // /TODO:API call
      const response=await fetch(`${host}/api/notes/addnote`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'auth-token':  localStorage.getItem('token')},
        body:JSON.stringify({tittle,description,tag})
      });
      const note=await response.json();
      setNotes(notes.concat(note))
      console.log("Adding a new note"+response); 
    }
    // Delete a Note
const deleteNote = async(id)=>{
  // ToDo api call
  const response1=await fetch(`${host}/api/notes/deletenote/${id}`,{
    method:'DELETE',
    headers:{
      'Content-Type':'application/json',
      'auth-token':localStorage.getItem('token') }
  });
  const json= await  response1.json();
  console.log(json);
      console.log("Deleting the note with id "+id);
      
      const newNotes= notes.filter((note)=>{ return note._id !==id } )
       setNotes(newNotes);

    }



    // Edit a Note
    const editNote= async (id,tittle,description,tag)=>{
      // Api coll
      const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
          'auth-token': localStorage.getItem('token')    },
        body:JSON.stringify({tittle,description,tag})
      });
      const json= await response.json();
      console.log(json);
    let newNotes=JSON.parse(JSON.stringify(notes))
      // logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id===id) {
          newNotes[index].tittle=tittle;
          newNotes[index].description=description;
          newNotes[index].tag=tag;
          break;
        }
      }
      console.log(notes);
      setNotes(newNotes);
    }
 return(
   
    <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}} >
       { props.children}
    </noteContext.Provider>
 )
 }
export default NoteState; 