import React from 'react'
import {decode} from 'html-entities';

export default function TriviaSection(props) {
    
    if(props.choices.length == 4) {
        return ( //returns question and 4 answers
        <div className="TriviaSection-div"> 
            <h1 className="question-title">{decode(props.result.question)}</h1>
            <div className="choices-div">
                <input type="radio" className="radio-input" id={props.choices[0]} name={props.result.question}>
                </input>
                <label className="radio-label" onClick={props.saveSelectedAnswer} htmlFor={props.choices[0]} data-index={props.index}>{decode(props.choices[0])}
                </label>
                
                <input type="radio" className="radio-input" id={props.choices[1]} name={props.result.question}> 
                </input>
                <label className="radio-label" onClick={props.saveSelectedAnswer} htmlFor={props.choices[1]} data-index={props.index}>{decode(props.choices[1])}</label>
                
                <input type="radio" className="radio-input" id={props.choices[2]} name={props.result.question}> 
                </input>
                <label className="radio-label" onClick={props.saveSelectedAnswer} htmlFor={props.choices[2]} data-index={props.index}>{decode(props.choices[2])}</label>
                
                <input type="radio" className="radio-input" id={props.choices[3]} name={props.result.question}>
                </input>
                <label className="radio-label" onClick={props.saveSelectedAnswer} htmlFor={props.choices[3]} data-index={props.index}>{decode(props.choices[3])}</label>
            </div>
        </div>
    )
    } else if (props.choices.length == 2) {
        //label htmlFor and input id should have an extra ID at the end. Or replace the input id with the new ID.
        return ( //returns question and 2 answers (true or false)
        <div>
            <h1 className="question-title">{decode(props.result.question)}</h1>
            <div className="choices-div">
                <input type="radio" className="radio-input" id={props.choices[0]+props.index} name={props.result.question}>
                </input>
                <label className="radio-label radio-boolean" onClick={props.saveSelectedAnswer} htmlFor={props.choices[0]+props.index} data-index={props.index}>{decode(props.choices[0])} 
                </label>
                
                <input type="radio" className="radio-input" id={props.choices[1]+props.index} name={props.result.question}>
                </input>
                <label className="radio-label radio-boolean" onClick={props.saveSelectedAnswer}  htmlFor={props.choices[1]+props.index} data-index={props.index}>{decode(props.choices[1])}
                </label>
            </div>
        </div>
    )
    } else {
        console.log("Warning: else statement triggered in TriviaSection component.")
    }
}
