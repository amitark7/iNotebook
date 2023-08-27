import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContex';

const About=()=> {
    const a=useContext(noteContext)
  return (
    <div>
      <h1>This Is About Page Name {a.name} And Class {a.class}</h1>
    </div>
  )
}

export default About
