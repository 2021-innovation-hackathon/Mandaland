import React from "react"
import "./MandalViewChanger.css"

const MandalViewChanger = () => {
    return (
        <div className="mandalViewChanger-wrapper">
            <nav className="mandalViewChanger english">
                <select name="" id="" className="plannerSelectBox">
                    <option value="">MANDALPLAN</option>
                    <option value="">MANDAL2</option>
                </select>
                <div className="vertical-devider" />
                <div className="myText">MY</div>
            </nav>
        </div>
    )
}

export default MandalViewChanger
