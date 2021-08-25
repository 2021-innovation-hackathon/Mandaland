import React from 'react'
import './MonthlyProgress.css'

const MonthlyProgress = (props) => {
    const progressStyle = {
        height: `${props.progress}px`,
    }
    return (
        <div className="wrap-progress">
            {/* <progress value="70" max="100">70 %</progress> */}
            <div className={`progress-bar ${props.highest == true ? 'highest' : '' } ${props.lowest == true ? 'lowest' : '' }`} style={progressStyle}></div>
            <span className="english">{props.month}</span>
        </div>
    )
}

export default MonthlyProgress
