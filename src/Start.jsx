import React from "react"

export default function Start(props) {
    

    // Make a function that takes the inputs and makes an object from it. Then pass the object to callTrivia. 
    const urlDataObject = {
    }

    return (
    <div className="Start-div">
        <h1>Quizzical</h1>
        <p>Lorem Ipsum Dolor</p>
        <input type="text"></input>
    <button className="Start-quiz-btn" onClick={() => {props.callTrivia(urlDataObject)}}>Start quiz</button>
    </div>)
}