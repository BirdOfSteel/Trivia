import React from 'react'
import { decode } from 'html-entities'
import { nanoid } from 'nanoid'

export default function TriviaSection(props) {

    console.log(props.selectedAnswers)

    // function handleLabelClick(randomId) {
    //     const inputElement = document.getElementById(randomId);
    //     if (inputElement) {
    //         inputElement.click(); // Manually trigger the click event on the associated input
    //         props.saveSelectedAnswer(); // Trigger the function to save the selected answer
    //     }
    // }

    // if(props.data) {
    //     const choicesAsElements = props.data.choices.map((choice,index) => {
    //         const randomId = nanoid()
            
    //         return (
    //             <div key={nanoid()}>
    //                 <input type="radio" className="radio-input" id={randomId} name={props.data.question}></input>
    //                 <label className="radio-label" htmlFor={randomId} onClick={handleLabelClick} name={props.data.question} data-triviaindex={props.data.triviaIndex}>{decode(props.data.choices[index])}</label>
    //             </div>
    //         )
    //     })
    
    //     return (
    //         <div className="TriviaSection-div">
    //             <h1 className="question-title">{decode(props.data.question)}</h1>
    //             <div className="choices-div">
    //                 {choicesAsElements}
    //             </div>
    //         </div>
    //     )
    // } else {
    //     return <p>Loading...</p>
    // }


}
