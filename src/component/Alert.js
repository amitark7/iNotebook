import React from "react";

function Alert(props) {
  const Capitalize= (word)=>{
    if(word==='Danger'){
      return word="Error"
    }
    //const lower=word.toLowercase()
    return word
   // console.log(lower);
   // let lower = word.charAt(0).toUpperCase()+word.slice(1);
    
   // console.log(lower);
  }
  return (
    <div style={{height:'50px'}} >
    {props.alert&&<div className={props.alert.type}>
      <strong>{Capitalize(props.alert.type)} :</strong> {props.alert.msg}</div>}
    </div>
  );
}

export default Alert;
