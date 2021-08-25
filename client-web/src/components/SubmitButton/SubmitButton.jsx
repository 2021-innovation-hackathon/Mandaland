import React from "react"
import "../CustomButton/CustomButton.css"
import "./SubmitButton.css"

const SubmitButton = (props) => {
    const { text } = props
    return (
        <button className="custom-button submit-button" type="submit">
            <div className="text">{text}</div>
        </button>
    )
}

export default SubmitButton
