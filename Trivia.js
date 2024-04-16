import React from 'react'

export default function Trivia(props) {
    return (
        <form>
            {props.trivia}
            <button type="submit" onClick={props.submitChoices}>Submit</button>
        </form>
    )
}