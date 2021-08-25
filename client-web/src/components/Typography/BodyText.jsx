import React from 'react'
import './BodyText.css'

const BodyText = ({fontsize, text}) => {
    return (
        <div>
            <h3 className={`bodyText-${fontsize}-font-style`}>{text}</h3>
        </div>
    )
}

export default BodyText
