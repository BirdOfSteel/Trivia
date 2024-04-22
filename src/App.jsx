import React from "react"
import Start from "./Start.jsx"
import { decode } from 'html-entities'
import TriviaQuestions from "./TriviaQuestions.jsx"
import TriviaAnswers from "./TriviaAnswers.jsx"
import yellowBlob from './resources/yellow-blob.png'
import blueBlob from './resources/blue-blob.png'

export default function App() {
    // page state helps control what content is displayed
    const [page, setPage] = React.useState('start')
    // selectedAnswers state will hold the answers that have been clicked
    const [selectedAnswers, setSelectedAnswers] = React.useState([]);
    // triviaStorage will hold data from the trivia API call
    const [triviaStorage, setTriviaStorage] = React.useState()
    
    // sets page to start page, allowing start page to display
    function playAgain() {
        setPage('start')
    }

    // sets page to answers, allowing answers to display
    function showAnswers() {
        setPage('answers')
    }
    
    // when a choice is clicked, it's stored into selectedAnswers
    function saveSelectedAnswer(e) {
        const value = decode(e.target.innerHTML)
        const index = e.target.dataset.triviaindex
    
        setSelectedAnswers(prevAnswers => {
            let array = [...prevAnswers]
            array.splice(index,  1, value)
    
            return [...array]
        })
    }
    
    // shuffle function for arrays. used for shuffling choices to questions.    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Generate random index
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }
    
    // turns data received from API call into objects containing all the data we need.
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
    
    // takes the data from input fields in Start.jsx (received as an object)
    // and converts it into query string 
    function convertURLObjectToURL(urlObject) {
        let URLString = "https://opentdb.com/api.php"
        URLString += `?amount=${urlObject.quantity}`

        let categoryString  = ''

        switch (urlObject.category) {
            case 'Art': categoryString = '&category=25';
            break;
            case 'Animals': categoryString = '&category=27';
            break;
            case 'Celebrities': categoryString = '&category=26';
            break;
            case 'Entertainment: Books': categoryString = '&category=10';
            break;
            case 'Entertainment: Board Games': categoryString = '&category=16';
            break;
            case 'Entertainment: Cartoon & Animations': categoryString = '&category=32';
            break;
            case 'Entertainment: Comics': categoryString = '&category=29';
            break;
            case 'Entertainment: Film': categoryString = '&category=11';
            break;
            case 'Entertainment: Japanese Anime & Manga': categoryString = '&category=31'
            break;
            case 'Entertainment: Music': categoryString = '&category=12';
            break;
            case 'Entertainment: Musicals & Theatres': categoryString = '&category=13';
            break;
            case 'Entertainment: Television': categoryString = '&category=14';
            break;
            case 'Entertainment: Video Games': categoryString = '&category=15';
            break;
            case 'General Knowledge': categoryString = '&category=9';
            break;
            case 'Geography': categoryString = '&category=22';
            break;
            case 'History': categoryString = '&category=23';
            break;
            case 'Mythology': categoryString = '&category=20';
            break;
            case 'Politics': categoryString = '&category=24';
            break;
            case 'Science & Nature': categoryString = '&category=17';
            break;
            case 'Science: Computers': categoryString = '&category=18';
            break;
            case 'Scicence: Gadgets': categoryString = '&category=30';
            break;
            case 'Science: Mathematics': categoryString = '&category=19';
            break;
            case 'Sports': categoryString = '&category=21';
            break;
            case 'Vehicles': categoryString = '&category=28';
            break;
        }
        URLString += categoryString

        let difficultyString = ''

        switch (urlObject.difficulty) {
            case 'Easy': difficultyString = '&difficulty=easy';
            break;
            case 'Medium': difficultyString = '&difficulty=medium';
            break;
            case 'Hard': difficultyString = '&difficulty=hard';
            break;
        }
        URLString += difficultyString
        

        let typeString = ''
        switch (urlObject.type) {
            case 'Multiple Choice': typeString = '&type=multiple';
            break;
            case 'True / False': typeString = '&type=boolean'
            break;
        }
        URLString += typeString

        return URLString
    }

    // function for calling API
    function callTrivia(urlObject) {
        fetch(convertURLObjectToURL(urlObject)) // ./mockAPI.json
            .then(res => res.json())
            .then(data => {
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