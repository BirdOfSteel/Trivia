import React from "react"
import Start from "./Start.jsx"
import TriviaSection from "./TriviaSection.jsx"
import Trivia from "./Trivia.jsx"
import { nanoid } from 'nanoid'
import yellowBlob from './resources/yellow-blob.png'
import blueBlob from './resources/blue-blob.png'

// ADD NANOID

// Refactor TriviaSection component to accept a prop of showAnswers. showAnswers should be false unless we're calling it from the submit button, in which case it's true. Make an if statement in TriviaSection.js that checks if showAnswers is true, and if it is, then return a block of code that returns the answers. 


export default function App() {
    const x = nanoid()
    console.log(x)
    //this state contains the page to be rendered
    const [page, setPage] = React.useState(<Start callTrivia={callTrivia} />)
    //these states track the correct and selected answers. they're compared against each other later
    const [correctAnswersArray, setCorrectAnswersArray] = React.useState([])
    const [selectedAnswers, setSelectedAnswers] = React.useState([])

    // make submit function that checks if all items are selected by comparing the length of selectedAnswers to correctAnswersArray.
    function submitChoices(e) {
        e.preventDefault()
        console.log("ran")
    }

    function saveSelectedAnswer(e) {
        if (e.target.className.includes('radio-boolean')) {
            const value = e.target.innerHTML
            const index = e.target.dataset.index

            setSelectedAnswers(prevAnswers => {
                let array = [...prevAnswers]
                array.splice(index, selectedAnswers[index] ? 1 : 0, value)
                return array
            })

        } else {
            const value = e.target.innerHTML
            const index = e.target.dataset.index
            setSelectedAnswers(prevAnswers => {
                let array = [...prevAnswers]
                array.splice(index, selectedAnswers[index] ? 0 : 1, value)
                return array
            })
        }
    }


    function callTrivia() {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {
                if (data.response_code == 0) {
                    const mappedResults = data.results.map((result, index) => {
                        // when .map iterates over a question, it adds the correct answer to correctAnswersArray
                        setCorrectAnswersArray(prevAnswers => {
                            return [...prevAnswers, result.correct_answer]
                        })

                        let choiceArray = [...result.incorrect_answers, result.correct_answer]
                        const shuffledChoices = shuffleArray(choiceArray)

                        return (
                            <TriviaSection
                                key={result.question}
                                index={index}
                                result={result}
                                choices={shuffledChoices}
                                saveSelectedAnswer={saveSelectedAnswer}
                            />
                        )
                    })

                    const newPage = <Trivia trivia={mappedResults} submitChoices={submitChoices} />
                    setPage(newPage) // page state is set to array of questions and choices.
                }
                else if (data.response_code == 1) {
                    console.log("No results")
                }
                else if (data.response_code == 2) {
                    console.log("One or more parameters are invalid")
                }
                else if (data.response_code == 3) {
                    console.log("Token not found: Session token does not exist.")
                }
                else if (data.response_code == 4) {
                    console.log("All possible queries have been returned. Reset token.")
                }
                else if (data.response_code == 5) {
                    console.log("Too many requests")
                }
                else {
                    console.log("Warning: else statement executed")
                }
            })
    }

    // Durstenfeld shuffle 
    function shuffleArray(array) {
        if (array.length == 4) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array
        }
        return array
    }

    return (
        <main>
            <img src={yellowBlob} className="yellow-blob-img" />
            <div id="main-div">
                {page}
            </div>
            <img src={blueBlob} className="blue-blob-img" />
        </main>
    )
}