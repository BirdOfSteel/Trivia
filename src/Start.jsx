import React from "react"

export default function Start(props) {
    
    return (
    <div className="Start-div">
        <h1>Quizzical</h1>
        <p>Lorem Ipsum Dolor</p>
        <button onClick={props.callTrivia}>Start quiz</button>
    </div>)
}