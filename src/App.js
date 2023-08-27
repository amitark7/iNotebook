import "./App.css";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import NoteState from "./context/notes/NoteState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from "./component/Alert";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import { useState } from "react";

function App() {
  const[alert,setAlert]=useState('none')

  const showAlert=(message,type)=>{
    console.log(message);
    console.log(type);
    setAlert({
      msg:message,
      type:type
    });
    console.log(alert.msg);
    setTimeout(() => {
      setAlert("none")
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
            <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>}></Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
