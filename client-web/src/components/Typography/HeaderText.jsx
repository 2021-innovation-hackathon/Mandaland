import React from 'react'
import './HeaderText.css'

const HeaderText = ({text}) => {
    return (
        <div>
            <h3 className="header-font-style">{text}</h3>
        </div>
    )
}

export default HeaderText
