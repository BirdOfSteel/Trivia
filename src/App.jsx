import React from "react"
import Start from "./Start.jsx"
import { nanoid } from "nanoid"
import { decode } from 'html-entities'
import TriviaQuestions from "./TriviaQuestions.jsx"
import TriviaAnswers from "./TriviaAnswers.jsx"
import yellowBlob from './resources/yellow-blob.png'
import blueBlob from './resources/blue-blob.png'


// Make a function in App.jsx that takes an object and creates a custom API link from it.
// Start.jsx should call this function from an anonymous function and pass it an object that contains information from the inputs.

export default function App() {
    const [page, setPage] = React.useState('start')
    const [selectedAnswers, setSelectedAnswers] = React.useState([]);
    const [triviaStorage, setTriviaStorage] = React.useState()

    function saveSelectedAnswer(e) {
        const value = decode(e.target.innerHTML)
        const index = e.target.dataset.triviaindex

        setSelectedAnswers(prevAnswers => {
            let array = [...prevAnswers]
            array.splice(index,  1, value)

            return [...array]
        })
    }

    function initialiseTriviaStorage(data) {
        const triviaData = data.results.map((result, index) => {
            const choices = [result.correct_answer, ...result.incorrect_answers]    
            const choicesDecoded = choices.map(choice => decode(choice))
            
            return (
                {
                    question: decode(result.question),
                    choices: shuffleArray(choicesDecoded),
                    correct_answer: decode(result.correct_answer),
                    triviaIndex: index
                }
            )
        })
        setTriviaStorage(triviaData)
    }

    function showAnswers(e) {
        e.preventDefault()
        if (!selectedAnswers.includes(null)) {
            setPage('answers')
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Generate random index
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }
    
    function playAgain() {
        setPage('start')
    }

    function callTrivia(x) {
        fetch("https://opentdb.com/api.php?amount=5") // ./mockAPI.json
            .then(res => res.json())
            .then(data => {
                console.log(x)
                if (data.response_code == 0) {
                    setSelectedAnswers(Array(data.results.length).fill(null))
                    initialiseTriviaStorage(data)
                    setPage('questions')
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
            }) .catch (console.log("Error in callTrivia"))
    }

    return (
        <main>
            <img src={yellowBlob} className="yellow-blob-img" />
            <div id="main-div">
                {page === 'start' && <Start callTrivia={callTrivia}/>}
                {page === 'questions' && <TriviaQuestions triviaData={triviaStorage} selectedAnswers={selectedAnswers} saveSelectedAnswer={saveSelectedAnswer} showAnswers={showAnswers}/>}
                {page === 'answers' && <TriviaAnswers triviaData={triviaStorage} selectedAnswers={selectedAnswers} playAgain={playAgain}/>} 
            </div>
            <img src={blueBlob} className="blue-blob-img" />
        </main>
    )
}