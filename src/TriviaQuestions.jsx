import React from 'react'
import { nanoid } from 'nanoid'


export default function TriviaQuestions(props) {
    const [remainingQuestions, setRemainingQuestions] = React.useState('All')
    const [showRemainingQuestions, setShowRemainingQuestions] = React.useState(false)
    
    React.useEffect(() => {

        let remainingQuestionsArray = []

        for (let i = 0; i < props.selectedAnswers.length; i++) {
            if (props.selectedAnswers[i] == null) {
                remainingQuestionsArray.push(i + 1)
            } 
        }
        
        setRemainingQuestions(remainingQuestionsArray)

    },[props.selectedAnswers])

    function checkAllQuestionsAnswered() {
        if (props.selectedAnswers.includes(null)) {
            setShowRemainingQuestions(true)
        } else {
            props.showAnswers()
        }
    }

    function callSaveSelectedAnswer(e) {
        if(remainingQuestions.length == 1) {
            setShowRemainingQuestions(false)
        }
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
            <h1 className="question-title">{triviaObject.triviaIndex+1 + ") " + triviaObject.question}</h1>
            <div className="choices-div">
                {choiceElements}
            </div>
        </div>
        )
    })


    return (
        <form>
            {questionElements}
            <div className="TriviaQuestions--lower_div">
                <button className="check-answers-btn" type="button" onClick={checkAllQuestionsAnswered}>Check answers</button>
                {showRemainingQuestions && <p className="unanswered-questions-text">Unanswered question: {remainingQuestions.join(', ')}</p>}
            </div>
        </form>
    );
}