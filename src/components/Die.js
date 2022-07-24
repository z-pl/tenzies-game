import React from "react";

export default function Die(props) {

  function handleToggleHold() {
    props.toggleHold(props.id);
  }

  return (
    <div className = {`die-item ${props.isHeld? "hold" : ""}`} onClick = {handleToggleHold} >
      {props.value}
    </div>
  )
}
