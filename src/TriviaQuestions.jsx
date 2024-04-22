import React from 'react'
import { nanoid } from 'nanoid'


export default function TriviaQuestions(props) {
    // these states control the remaining questions and if they're displayed
    const [remainingQuestions, setRemainingQuestions] = React.useState('All')
    const [showRemainingQuestions, setShowRemainingQuestions] = React.useState(false)
    
    // useEffect keeps track of all the questions that haven't been answered yet.
    React.useEffect(() => {

        let remainingQuestionsArray = []

        for (let i = 0; i < props.selectedAnswers.length; i++) {
            if (props.selectedAnswers[i] == null) {
                remainingQuestionsArray.push(i + 1)
            } 
        }
        
        setRemainingQuestions(remainingQuestionsArray)

    },[props.selectedAnswers])


    // checks that that all questions are answered by checking selectedAnswers state for null.
    function checkAllQuestionsAnswered() {
        if (props.selectedAnswers.includes(null)) {
            setShowRemainingQuestions(true)
        } else {
            props.showAnswers()
        }
    }

    // calls saveSelectedAnswer which allow for choices to be selected
    function callSaveSelectedAnswer(e) {
        if(remainingQuestions.length == 1) {
            setShowRemainingQuestions(false)
        }
        props.saveSelectedAnswer(e)
    }

    // maps over the triviaData to create questions a map of questions and choices.
    const questionElements = props.triviaData.map((triviaObject,questionIndex) => {
        
        //maps over array of choices for each question to produce an array of choices in JSX 
        const choiceElements = triviaObject.choices.map((choice,choiceIndex) => {

            const randomId = nanoid()
            
            let style = {}

            //checks if the selected choice stored in state is equal to the current choice being iterated over. 
            if (props.selectedAnswers[questionIndex] == choice) {
                style = {
                    background: "#D6DBF5",
                    border: "1px solid #D6DBF5"
                }
            }

            //returns a choice element: input + label wrapped in a div.
            return (
            <div key={nanoid()}>
                <input type="radio" className="TriviaSection--radio_input" id={randomId} name={triviaObject.question}></input>
                <label style={style} className="TriviaSection--radio_label" htmlFor={randomId} onClick={callSaveSelectedAnswer} name={triviaObject.question} data-triviaindex={triviaObject.triviaIndex}>{triviaObject.choices[choiceIndex]}</label>
            </div>
            )
        })    

        // returns a question with its choices as JSX
        return (
        <div className="TriviaSection--div" key={nanoid()}>
            <h1 className="TriviaSection--question_title">{triviaObject.triviaIndex+1 + ") " + triviaObject.question}</h1>
            <div className="TriviaSection--choices_div">
                {choiceElements}
            </div>
            <hr style={{marginTop: "2em", borderTop: "1px", borderColor: "#DBDEF0"}}></hr>
        </div>
        )
    })

    // returns page to render
    return (
        <form>
            {questionElements}
            <div className="TriviaQuestions--lower_div">
                <button className="TriviaQuestions--check_answers_btn" type="button" onClick={checkAllQuestionsAnswered}>Check answers</button>
                {showRemainingQuestions && <p className="TriviaQuestions--unanswered_questions_text">Unanswered question: {remainingQuestions.join(', ')}</p>}
            </div>
        </form>
    );
}