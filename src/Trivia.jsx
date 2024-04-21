import React, { useEffect } from 'react';
import { decode } from 'html-entities';
import { nanoid } from 'nanoid';
import TriviaSection from './TriviaSection';


export default function Trivia(props) {
    const [correctAnswersArray, setCorrectAnswersArray] = React.useState([]);
    const [selectedAnswers, setSelectedAnswers] = React.useState([]);
    
    const [triviaStorage, setTriviaStorage] = React.useState([])
    

    // Add correct_answer field to returned object under triviaDataArray. 
    // Initialise TriviaSectionAnswers  like mappedResults, but also pass in selectedAnswers. 
    // Only execute if selectedAnswers does not contain null.
    // TriviaSectionAnswers should be a copy of TriviaSection, but remove the radio input and
    // add conditional styling for the background.
    // if selected_answer == correct_answer. If true, you only need to
    // iterate to check current button is equal to correct_answer, then give it green background.
    // Else, if (selected_answer == current_value) {red background}. Else if (selected_answer == 
    // correct_answer) {green background}. Else transparent background. 


    useEffect(() => {
        // Initialize correctAnswersArray once when the component mounts
        const correctAnswers = props.triviaData.results.map(result =>
            decode(result.correct_answer)
        );

        const triviaDataArray = props.triviaData.results.map((result,index) => {
            let choices = [...result.incorrect_answers, result.correct_answer]
            const choicesDecoded = choices.map(choice => decode(choice))

            return (
                {
                    question: decode(result.question),
                    choices: shuffleArray(choicesDecoded),
                    correct_answer: result.correct_answer,
                    triviaIndex: index
                }
            )
        })
        setTriviaStorage(triviaDataArray)


        setCorrectAnswersArray(correctAnswers);
        // Initialize selectedAnswers with null values
        setSelectedAnswers(Array(props.triviaData.results.length).fill(null));
    }, [props.triviaData.results]); // Trigger effect when triviaData.results changes

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function saveSelectedAnswer(e) {
        const value = decode(e.target.innerHTML)
        const index = e.target.dataset.triviaindex

        setSelectedAnswers(prevAnswers => {
            let array = [...prevAnswers]
            array.splice(index,  1, value)

            return [...array]
        })
    }

    function generateAnswers() {
        const mappedAnswers = props.triviaData.results.map((result, index) => {
            return (
                <TriviaSection 
                    key={nanoid()}
                    data={triviaStorage[index]}
                    selectedAnswers={selectedAnswers}
                    saveSelectedAnswer={saveSelectedAnswer}
                />
            );
        });
        
    }


    const mappedResults = props.triviaData.results.map((result, index) => {
        return (
            <TriviaSection 
                key={nanoid()}
                data={triviaStorage[index]}
                saveSelectedAnswer={saveSelectedAnswer}
            />
        );
    });

    function submitChoices() {
        const mappedAnswers = props.triviaData.results.map((result, index) => {
            return (
                <TriviaSection 
                    key={nanoid()}
                    data={triviaStorage[index]}
                    saveSelectedAnswer={saveSelectedAnswer}
                />
            );
        });

        const newPage = 
        <div>
            {mappedAnswers}
            <p>0/0</p><button></button>
        </div>
        setPage(newPage)
        console.log("submit clicked")       
    }

    return (
        <form>
            {mappedResults}
            <button type="submit" onClick={submitChoices}>Submit</button>
        </form>
    );
}