import React from "react"
import "./CustomButton.css"

const CustomButton = (props) => {
    const { text, onClick } = props
    return (
        <div className="custom-button" onClick={onClick}>
            <div className="text">{text}</div>
        </div>
    )
}

export default CustomButton
