import React from "react"
import { Link } from "react-router-dom"
import "./Logo.css"

const Logo = (isTitleText) => {
    return (
        <Link to="/" className="alignStyle">
            <div className="logo">
                <img src={window.location.origin + "/images/logo.png"} alt="mandalandLogo" />
            </div>
        </Link>
    )
}

export default Logo
