import React from 'react'
import { decode } from 'html-entities';
import { nanoid } from 'nanoid'

export default function TriviaSection(props) {

    const choicesAsElements = props.choices.map((choice,index) => {
        const randomId = nanoid()
        return (
            <div key={randomId}>
                <input type="radio" className="radio-input" id={randomId} name={props.result.question}></input>
                <label className="radio-label" htmlFor={randomId} onClick={props.saveSelectedAnswer} name={props.result.question} data-questionIndex={props.questionIndex}>{decode(props.choices[index])}</label>
            </div>
        )
    })

    return (
        <div className="TriviaSection-div">
            <h1 className="question-title">{decode(props.result.question)}</h1>
            <div className="choices-div">
                {choicesAsElements}
            </div>
        </div>
    )
}
