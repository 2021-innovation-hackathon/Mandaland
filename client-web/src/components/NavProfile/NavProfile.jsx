import React from "react"
import "./NavProfile.css"

const NavProfile = ({ open, userProfile }) => {
    const { imagePath, name, email } = userProfile

    const renderImage = () => {
        return open && imagePath ? <img className="navprofile-image" src={imagePath} alt="profile" /> : null
    }

    const renderClassName = () => {
        return open || open === undefined ? "" : "close"
    }

    return (
        <div className={`navprofile-container ${renderClassName()}`}>
            <div className="navprofile">{renderImage()}</div>
            <div className="navprofile-name english">Hi, {name}</div>
            <div className="navprofile-email">{email}</div>
        </div>
    )
}

export default NavProfile
