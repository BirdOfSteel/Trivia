import React from "react"

export default function Start(props) {
    const [questionQty, setQuestionQty] = React.useState(5)
    
    // handleQuantityChange is equal to the value of the question quantity input.
    // it sets the state to the given number, then the input value reflects the state.
    const handleQuantityChange = (event) => {
        setQuestionQty(event.target.value);
    };

    // turns inputs into an object to pass App.jsx
    function prepareURLDataObject() {
        const urlDataObject = {
            quantity: document.getElementById("question-quantity").value,
            category: document.getElementById("select-category").value,
            difficulty: document.getElementById("select-difficulty").value,
            type: document.getElementById("select-type").value
        }
        props.callTrivia(urlDataObject)
    }


    return (
    <div className="Start--div">
        <h1>Trivia API</h1>
        <p>Select from the options below to customise your game, or play with default settings</p>
        <form className="Start--url_form">
            <label htmlFor="question-quantity">Numbers of Questions:</label>
            <input id="question-quantity" type="number" min="1" max="50" value={questionQty} onChange={handleQuantityChange}></input>

            <label htmlFor="select-category">Select Category:</label>
            <select className="dropdown-list" id="select-category">
                <option value="Any category">Any Category</option>
                <option value="Art">Art</option>
                <option value="Animals">Animals</option>
                <option value="Celebrities">Celebrities</option>
                <option value="Entertainment: Books">Entertainment: Books</option>
                <option value="Entertainment: Board Games">Entertainment: Board Games</option>
                <option value="Entertainment: Cartoon & Animations">Entertainment: Cartoon & Animations</option>
                <option value="Entertainment: Comics">Entertainment: Comics</option>
                <option value="Entertainment: Film">Entertainment: Film</option>
                <option value="Entertainment: Japanese Anime & Manga">Entertainment: Japanese Anime & Manga</option>
                <option value="Entertainment: Music">Entertainment: Music</option>
                <option value="Entertainment: Musicals & Theatres">Entertainment: Musicals & Theatres</option>
                <option value="Entertainment: Television">Entertainment: Television</option>
                <option value="Entertainment: Video Games">Entertainment: Video Games</option>
                <option value="General Knowledge">General Knowledge</option>
                <option value="Geography">Geography</option>
                <option value="History">History</option>
                <option value="Mythology">Mythology</option>
                <option value="Politics">Politics</option>
                <option value="Science & Nature">Science & Nature</option>
                <option value="Science: Computers">Science: Computers</option>
                <option value="Science: Gadgets">Scicence: Gadgets</option>
                <option value="Science: Mathematics">Science: Mathematics</option>
                <option value="Sports">Sports</option>
                <option value="Vehicles">Vehicles</option>
            </select>

            <label htmlFor="select-difficulty">Select Difficulty:</label>
            <select className="dropdown-list" id="select-difficulty">
                <option value="Any Difficulty">Any Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>

            <label htmlFor="select-type">Select Type:</label>
            <select className="dropdown-list" id="select-type">
                <option value="Any Type">Any Type</option>
                <option value="Multiple Choice">Multiple Choice</option>
                <option value="True / False">True / False</option>
            </select>
            
            {props.errorMessage && <p className="Start--error_message">{props.errorMessage}</p>}

            <button type="button" className="Start--quiz_btn" onClick={prepareURLDataObject}>Start quiz</button>
        </form>
    </div>)
}