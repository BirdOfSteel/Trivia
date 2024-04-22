import React from 'react'
import { nanoid } from 'nanoid'

export default function TriviaAnswers(props) {
    
    // checks how many selected answers are correct
    function findNumberOfCorrectAnswers() {
        let score = 0;

        props.selectedAnswers.map((selectedAnswer,index) => {
            if (selectedAnswer == props.triviaData[index].correct_answer) {
                score = score + 1
            }
        }) 

        return score
    }

    // maps over the triviaData to create questions a map of questions and choices.
    const questionElements = props.triviaData.map((triviaObject,questionIndex) => {

        //maps over array of choices for each question to produce an array of choices in JSX 
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
                        border: "1px solid #F8BCBC"
                    }
                    // checks if the selected answer is equal to the current iterant
                }

            }

            const randomId = nanoid()
            //returns choice
            return (
                <p key={nanoid()} style={styles}className="TriviaSection--radio_label">{triviaObject.choices[choiceIndex]}</p>
            )
        })    

        // returns a question with its choices as JSX
        return (
        <div className="TriviaSection--div" key={nanoid()}>
            <h1 className="TriviaSection--question_title">{triviaObject.question}</h1>
            <div className="TriviaSection--choices_div">
                {choiceElements}
            </div>
        </div>
        )
    })

    // returns page to render
    return (
        <div>
            {questionElements}
            <div className="TriviaAnswers--lower_div">
                <p className="TriviaAnswers--score_text">{"You scored " + findNumberOfCorrectAnswers() + "/" + props.triviaData.length + " correct answers"}</p>
                <button className="TriviaAnswers--new_game_btn" type="submit" onClick={props.playAgain}>Play again</button>
            </div>
        </div>
    );
}