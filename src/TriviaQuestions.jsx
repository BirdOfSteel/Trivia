import React from 'react'
import { nanoid } from 'nanoid'


export default function TriviaQuestions(props) {

    function callSaveSelectedAnswer(e) {
        props.saveSelectedAnswer(e)
    }

    const questionElements = props.triviaData.map((triviaObject,questionIndex) => {
        
        const choiceElements = triviaObject.choices.map((choice,choiceIndex) => {

            const randomId = nanoid()
            
            let style = {}

            if (props.selectedAnswers[questionIndex] == choice) {
                style = {
                    background: "#D6DBF5",
                    border: "1px solid #D6DBF5"
                }
            }

            return (
            <div key={nanoid()}>
                <input type="radio" className="radio-input" id={randomId} name={triviaObject.question}></input>
                <label style={style} className="radio-label" htmlFor={randomId} onClick={callSaveSelectedAnswer} name={triviaObject.question} data-triviaindex={triviaObject.triviaIndex}>{triviaObject.choices[choiceIndex]}</label>
            </div>
            )
        })    

        return (
        <div className="TriviaSection-div" key={nanoid()}>
            <h1 className="question-title">{triviaObject.question}</h1>
            <div className="choices-div">
                {choiceElements}
            </div>
        </div>
        )
    })


    return (
        <form>
            {questionElements}
            <button className="check-answers-btn" type="submit" onClick={props.showAnswers}>Check answers</button>
        </form>
    );
}