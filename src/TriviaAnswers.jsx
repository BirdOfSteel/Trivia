import React from 'react'
import { nanoid } from 'nanoid'

export default function TriviaAnswers(props) {

    //write function that checks for number of correct answers

    function findNumberOfCorrectAnswers() {
        let score = 0;

        props.selectedAnswers.map((selectedAnswer,index) => {
            if (selectedAnswer == props.triviaData[index].correct_answer) {
                score = score + 1
            }
        }) 

        return score
    }

    const questionElements = props.triviaData.map((triviaObject,questionIndex) => {

        const choiceElements = triviaObject.choices.map((choice,choiceIndex) => {

            let styles = {
            }

            if (props.selectedAnswers[triviaObject.triviaIndex] == triviaObject.correct_answer && props.selectedAnswers[triviaObject.triviaIndex] == choice) {
                // if statement checks that the answer selected matches the correct question, and also checks if selected answer is the current iterant
                styles = {
                    background: "#94D7A2",
                    border: "1px solid #94D7A2"

                }
            } else {
                if (choice == triviaObject.correct_answer)
                    // checks if the current iterant is the correct answer to the question
                    styles = {
                        background: "#94D7A2",
                        border: "1px solid #94D7A2"
                    }
                else if (props.selectedAnswers[triviaObject.triviaIndex] == choice) {
                    styles = {
                        background: "#F8BCBC",
                        border: "1px solid #F8BCBC",
                        opacity: "50%"
                    }
                    // checks if the selected answer is equal to the current iterant
                }

            }

            const randomId = nanoid()

            return (
                <p key={nanoid()} style={styles}className="radio-label">{triviaObject.choices[choiceIndex]}</p>
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
        <div>
            {questionElements}
            <div className="TriviaAnswers--lower_div">
                <p className="score-text">{"You scored " + findNumberOfCorrectAnswers() + "/" + props.triviaData.length + " correct answers"}</p>
                <button className="new-game-btn" type="submit" onClick={props.playAgain}>Play again</button>
            </div>
        </div>
    );
}